import { Controller, Control, FieldErrors, UseFormStateReturn } from 'react-hook-form';
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
      <Controller
        name="expired"
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expired"
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => field.onChange(newValue ? dayjs(newValue).format('YYYY-MM-DD') : '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  
                 
                />
              )}
            />
          </LocalizationProvider>
        )}
      />
    </FormControl>
  );
};

export default ExpiryDatePicker;
