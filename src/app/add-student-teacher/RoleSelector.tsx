"use client"

import React, {useState} from 'react'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

type RoleSelectorProp = {
  updateRole: (role: string) => void
}

const RoleSelector = ({updateRole}: RoleSelectorProp) => {
  const [selectedRole, setSelectedRole] = useState('student')

 const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);

    updateRole(selectedRole)
  }



  return (
    <div>
    <FormLabel component="legend">Select Role</FormLabel>
    <RadioGroup row aria-label="role" name="role" value={selectedRole} onChange={handleRoleChange}>
      <FormControlLabel value="student" control={<Radio />} label="Student" />
      <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
    </RadioGroup>
  </div>
  )
}

export default RoleSelector