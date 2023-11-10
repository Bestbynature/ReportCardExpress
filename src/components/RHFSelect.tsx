"use client";

import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { RHFSelectProps } from '@/lib/types/types';
import { classes, sessions } from '../../constants';

export function RHFSelect(props: RHFSelectProps) {
  const { options, value, onChange, name, label } = props;

  return (
    <Box component={'div'} sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          name={name}
          label={label}
          onChange={onChange}
        >
          {options.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}



const RHFSelectImplement = () => {

  const [level, setLevel] = useState('');
  const [session, setSession] = useState('');

  const handleLevelChange = (event: any) => {
    setLevel(event.target.value);
  };

  const handleSessionChange = (event: any) => {
    setSession(event.target.value);
  };

  return (
    <div className='flex flex-col w-full gap-3'>
      <RHFSelect
        options={classes}
        value={level}
        label="currentClass"
        name="currentClass"
        onChange={handleLevelChange}
      />

      <RHFSelect
        options={sessions}
        value={session}
        label='currentSession'
        name='currentSession'
        onChange={handleSessionChange}
      />
    </div>
  );
}

export default RHFSelectImplement