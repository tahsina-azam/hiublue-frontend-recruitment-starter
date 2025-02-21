import { Controller, Control } from 'react-hook-form';
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
  setValue: (name: string, value: any) => void;
  selectedAdditions: string[];
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
              checked={selectedAdditions.includes(addition)}
              onChange={(e) => {
                setValue(
                  'additions',
                  e.target.checked
                    ? [...selectedAdditions, addition]
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
