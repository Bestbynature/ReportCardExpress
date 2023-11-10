"use client"

import React from 'react'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import UpdateTeacherButton from './UpdateTeacherButton';


type InfoType = {
 info: {
  firstName: string;
  lastName: string;
  role: string;
  gender: string;
  email: string;
  teacherId: string;
 }
}


const UpdateTeacherRecord = ({info}: InfoType
   ) => {

  const [formData, setFormData] = React.useState({
    firstName: info.firstName,
    role: info.role,
    lastName: info.lastName,
    gender: info.gender,
    email: info.email,
    teacherId: info.teacherId,
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const formFields = [
    {
      name: 'firstName',
      placeholder: "Teacher's first name",
      type: 'text',
      value: formData.firstName,
    },
    {
      name: 'lastName',
      placeholder: "Teacher's last name",
      type: 'text',
      value: formData.lastName,
    },
    {
      name: 'teacherId',
      placeholder: "Teacher's Id",
      type: 'hidden',
      value: formData.teacherId || '',
    },
    {
      name: 'email',
      placeholder: "Teacher's email",
      type: 'email',
      value: formData.email || '',
    },
  ];

  


  return (
    <div className='items-center flex flex-col justify-center'>
      <h1 className="mb-3 text-lg font-bold text-center">{`Update a Teacher's Record`}</h1>
      <form onSubmit={handleSubmit} className='max-w-[400px]'>

        <div className="grid grid-cols-1 gap-3">
          {formFields.map((field, index) => (
            <input
              key={index}
              className="input w-full input-bordered"
              required
              name={field.name}
              value={field.value}
              placeholder={field.placeholder}
              type={field.type}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          ))}

                   

          <span className="flex flex-col items-center gap-4">
            <div
              className="flex items-center gap-5 border rounded-md w-full input input-bordered"
              style={{ height: '3.5rem' }}
            >
              <FormLabel id="gender-label">Gender</FormLabel>

              <RadioGroup
                row
                aria-labelledby="gender-label"
                defaultValue={info.gender}
                name="gender"
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                }}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </div>
          </span>
        </div>
        <UpdateTeacherButton data={formData} />
      </form>
    </div>
  )
}

export default UpdateTeacherRecord