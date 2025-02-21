import { useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextField, Autocomplete, FormControl } from '@mui/material';
import axios from 'axios';
import { FormData,User } from '@/types/types';
import { useAuth } from 'context/authContext';

interface UserSelectorProps {
  control: Control<FormData>;
  errors: any;
}

const UserSelector = ({ control, errors }: UserSelectorProps) => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (search: string) => {
    if (!search) return;
    setLoading(true);

    try {
      const { data } = await axios.get(`https://dummy-1.hiublue.com/api/users?search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
              <TextField {...params} label="Select User" error={!!errors.user_id} helperText={errors.user_id?.message} />
            )}
          />
        )}
      />
    </FormControl>
  );
};

export default UserSelector;
