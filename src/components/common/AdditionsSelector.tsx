import { Controller, Control, UseFormSetValue } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';
import { FormData } from '@/types/types';

interface AdditionsSelectorProps {
  control: Control<FormData>;
  setValue: UseFormSetValue<FormData>;
  selectedAdditions: ('refundable' | 'on_demand' | 'negotiable')[]; // Explicitly typing the additions
}

const AdditionsSelector = ({
  control,
  setValue,
  selectedAdditions,
}: AdditionsSelectorProps) => (
  <FormControl fullWidth component="fieldset" margin="normal">
    <FormLabel>Additions</FormLabel>
    <Box display="flex" gap={2}>
      {['refundable', 'on_demand', 'negotiable'].map((addition) => (
        <FormControlLabel
          key={addition}
          control={
            <Checkbox
              checked={selectedAdditions.includes(
                addition as 'refundable' | 'on_demand' | 'negotiable'
              )} // Explicitly cast addition
              onChange={(e) => {
                // When checked, add the addition, else remove it
                setValue(
                  'additions',
                  e.target.checked
                    ? [
                        ...selectedAdditions,
                        addition as 'refundable' | 'on_demand' | 'negotiable',
                      ] // Explicitly cast
                    : selectedAdditions.filter((a) => a !== addition)
                );
              }}
            />
          }
          label={addition.replace(/_/g, ' ')}
        />
      ))}
    </Box>
  </FormControl>
);

export default AdditionsSelector;
