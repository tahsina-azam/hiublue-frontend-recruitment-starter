import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormControl, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FormData } from '@/types/types';

interface ExpiryDatePickerProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const ExpiryDatePicker = ({ control, errors }: ExpiryDatePickerProps) => {
  return (
    <FormControl fullWidth margin="normal">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="expired"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Expired"
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) =>
                field.onChange(
                  newValue ? dayjs(newValue).format('YYYY-MM-DD') : ''
                )
              }
              slotProps={{
                textField: {
                  error: !!errors.expired,
                  helperText: errors.expired?.message,
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default ExpiryDatePicker;
