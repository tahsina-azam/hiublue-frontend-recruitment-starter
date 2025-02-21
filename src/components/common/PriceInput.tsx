import { Controller, Control } from 'react-hook-form';
import { TextField, FormControl } from '@mui/material';
import { FormData } from '@/types/types';

interface PriceInputProps {
  control: Control<FormData>;
  errors: any;
}

const PriceInput = ({ control, errors }: PriceInputProps) => (
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
          value={field.value !== undefined && field.value !== null ? field.value.toString() : ''}
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value ? parseFloat(value) : ''); // Ensure the value remains a number
          }}
        />
      )}
    />
  </FormControl>
);

export default PriceInput;
