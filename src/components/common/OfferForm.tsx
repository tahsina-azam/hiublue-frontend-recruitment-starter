import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Autocomplete,
  Card,
  CardContent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Adapter for dayjs
import dayjs from "dayjs";
import axios from "axios";

// Schema validation using Zod
const formSchema = z.object({
  plan_type: z.enum(["pay_as_you_go", "monthly", "yearly"]),
  additions: z.array(z.enum(["refundable", "on_demand", "negotiable"])),
  user_id: z.number(),
  expired: z.string(),
  price: z.number().positive(),
});

const OfferForm = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_type: "monthly",
      additions: [],
      user_id: null,
      expired: dayjs().format("YYYY-MM-DD"),
      price: "",
    },
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedAdditions = watch("additions");

  // Fetch users based on search input
  const fetchUsers = async (search) => {
    if (!search) return;
    setLoading(true);

    // Assuming you have the token stored, e.g., in localStorage or context
    const token = localStorage.getItem('authToken'); // Replace with actual token retrieval

    try {
      const { data } = await axios.get(
        `https://dummy-1.hiublue.com/api/users?search=${search}`,
        {
          headers: {
            Authorization: `Bearer fake-jwt-token`, // Include the token in the Authorization header
          },
        }
      );
      setUsers(data.data); // Assume API returns an array of user objects
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Ensure price is a number
      const formData = {
        ...data,
        price: parseFloat(data.price), // Convert price to a number
      };

      // Send POST request with headers
      await axios.post(
        "https://dummy-1.hiublue.com/api/offers",
        formData,
        {
          headers: {
            Authorization: `Bearer fake-jwt-token`, // Include the token in the Authorization header
            "Content-Type": "application/json", // Set Content-Type to application/json
          },
        }
      );
      alert("Offer sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: "100%", maxWidth: 720, mx: "auto", mt: 15 }}>
     

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Card Wrapper */}
          <Card sx={{ padding: 2 }}>
            <CardContent>
              {/* Plan Selection */}
              <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Create Offer</h1>
              <p style={{ marginBottom: "20px" }}>Send onboarding offers to new users.</p>
              <FormControl component="fieldset" margin="normal" fullWidth>
                <FormLabel>Plan Type</FormLabel>
                <Controller
                  name="plan_type"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      {["pay_as_you_go", "monthly", "yearly"].map((plan) => (
                        <FormControlLabel
                          key={plan}
                          value={plan}
                          control={<Radio />}
                          label={plan.replace(/_/g, " ")}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </FormControl>

              {/* Additions */}
              <FormControl fullWidth component="fieldset" margin="normal">
                <FormLabel>Additions</FormLabel>
                <Box display="flex" gap={2}>
                  {["refundable", "on_demand", "negotiable"].map((addition) => (
                    <FormControlLabel
                      key={addition}
                      control={
                        <Checkbox
                          checked={selectedAdditions.includes(addition)}
                          onChange={(e) => {
                            setValue(
                              "additions",
                              e.target.checked
                                ? [...selectedAdditions, addition]
                                : selectedAdditions.filter((a) => a !== addition)
                            );
                          }}
                        />
                      }
                      label={addition.replace(/_/g, " ")}
                    />
                  ))}
                </Box>
              </FormControl>

              {/* User Selection */}
              <FormControl fullWidth margin="normal">
                <Controller
                  name="user_id"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={users}
                      getOptionLabel={(option) => option.name}
                      loading={loading}
                      onInputChange={(e, value) => fetchUsers(value)}
                      onChange={(e, value) => field.onChange(value?.id)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select User"
                          error={!!errors.user_id}
                          helperText={errors.user_id?.message}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>

              {/* Expiry Date */}
              <FormControl fullWidth margin="normal">
                <Controller
                  name="expired"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Expired"
                      value={dayjs(field.value)}
                      onChange={(newValue) =>
                        field.onChange(dayjs(newValue).format("YYYY-MM-DD"))
                      }
                      renderInput={(params) => (
                        <TextField {...params} error={!!errors.expired} helperText={errors.expired?.message} />
                      )}
                    />
                  )}
                />
              </FormControl>

              {/* Price Input */}
              <FormControl fullWidth margin="normal">
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Price"
                      type="number"
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      value={field.value ? parseFloat(field.value) : ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || "")}
                    />
                  )}
                />
              </FormControl>
            </CardContent>
          </Card>

          {/* Submit Button outside Card */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              width:"111px",
              height:"48",
              backgroundColor: "black", // Black color for the button
            }}
          >
            Submit
          </Button>
          </Box>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default OfferForm;
