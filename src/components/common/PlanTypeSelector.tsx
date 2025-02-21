import { Controller, Control } from 'react-hook-form';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { FormData } from '@/types/types';

interface PlanTypeSelectorProps {
  control: Control<FormData>;
}

const PlanTypeSelector = ({ control }: PlanTypeSelectorProps) => (
  <FormControl component="fieldset" margin="normal" fullWidth>
    <FormLabel>Plan Type</FormLabel>
    <Controller
      name="plan_type"
      control={control}
      render={({ field }) => (
        <RadioGroup row {...field}>
          {['pay_as_you_go', 'monthly', 'yearly'].map((plan) => (
            <FormControlLabel key={plan} value={plan} control={<Radio />} label={plan.replace(/_/g, ' ')} />
          ))}
        </RadioGroup>
      )}
    />
  </FormControl>
);

export default PlanTypeSelector;
