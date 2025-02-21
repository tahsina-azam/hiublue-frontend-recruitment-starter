import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { formSchema, FormData } from '@/types/types';
import PlanTypeSelector from './PlanTypeSelector';
import AdditionsSelector from './AdditionsSelector';
import UserSelector from './UserSelector';
import ExpiryDatePicker from './ExpiryDatePicker';
import PriceInput from './PriceInput';
import { useAuth } from 'context/authContext';

const OfferForm = () => {
  const { token } = useAuth();
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_type: 'monthly',
      additions: [],
      user_id: null,
      expired: '',
      price: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        'https://dummy-1.hiublue.com/api/offers',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage({ type: 'success', text: response.data.message });
      console.log('Response:', response.data);

      // Hide the message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000); // 5 seconds delay
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to send the offer. Please try again.',
      });
      console.error('Error submitting form:', error);

      // Hide the error message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000); // 5 seconds delay
    }
  };

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', mt: 15 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 2 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              Create Offer
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Send onboarding offers to new users.
            </Typography>

            {/* Display the success/error message */}
            {message && (
              <Alert severity={message.type} sx={{ mb: 2 }}>
                {message.text}
              </Alert>
            )}

            <PlanTypeSelector control={control} />
            <AdditionsSelector
              control={control}
              setValue={setValue}
              selectedAdditions={watch('additions')}
            />
            <UserSelector control={control} errors={errors} />
            <ExpiryDatePicker control={control} errors={errors} />
            <PriceInput control={control} errors={errors} />
          </CardContent>
        </Card>

        {/* Submit Button at Flex End */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ backgroundColor: 'black' }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OfferForm;
