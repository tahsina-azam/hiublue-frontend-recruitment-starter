import { Controller, Control } from 'react-hook-form';
import { TextField, FormControl } from '@mui/material';
import { FormData } from '../types';

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
          value={field.value ? parseFloat(field.value) : ''}
          onChange={(e) => field.onChange(parseFloat(e.target.value) || '')}
        />
      )}
    />
  </FormControl>
);

export default PriceInput;
