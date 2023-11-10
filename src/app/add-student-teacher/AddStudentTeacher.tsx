'use client';

import FormSubmit from '@/components/FormSubmit';
import { authOptions } from '../api/auth/[...nextauth]/route';
import RHFSelectImplement from '@/components/RHFSelect';
import UploadStudentImage from '@/components/UploadStudentImage';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { addStudent, addteacher } from './action';
import { signIn, useSession } from 'next-auth/react';
import IsUserRegistered from '@/components/IsUserRegistered';


const metadata = {
  title: 'Add student - ReportCardExpress',
};



const AddStudentTeacher = () => {

  const { data: session, status } = useSession();

  const [selectedRole, setSelectedRole] = useState('student');

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };

  // const emailInput =  document.querySelector('input[name="parentEmail"]');
  // const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  
  
  const formFields = [
    { name: 'firstName', placeholder: " First name", type: 'text' },
    { name: 'lastName', placeholder: "Last name", type: 'text' },
    { name: 'parentEmail', placeholder: "Email", type: 'email' },
    { name: 'parentPhoneNumber', placeholder: " phone number", type: 'text' },
  ];


  if (status === 'unauthenticated') {
    return (
      <div className="text-red-700 text-center font-bold">
        <h1>You are not authorized to access this page!</h1>
        <h1>Please sign in by clicking the button below to gain access.</h1>

        <a href="/api/auth/signin?callbackUrl=/add-student-teacher" className="btn btn-secondary my-4">
          Sign In
        </a>
      </div>
    );
  }



  return (
    <>
      <div>
        <div className='flex flex-col items-center '>
          <FormLabel component="legend">Select Role</FormLabel>
          <RadioGroup
            row
            aria-label="role"
            name="role"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <FormControlLabel value="student" control={<Radio />} label="Student" />
            <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
          </RadioGroup>
        </div>

        <h1 className="mb-3 text-lg font-bold">Add a new {selectedRole}</h1>
        <form action={selectedRole === 'student' ? addStudent : addteacher}>
          {selectedRole === 'student' && <UploadStudentImage />}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {formFields.map((field, index) => (
              <input
                key={index}
                className="input w-full input-bordered"
                required
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
              />
            ))}

            {selectedRole === 'student' && <RHFSelectImplement />}

            <span className="flex flex-col items-center gap-4">
              <div
                className="flex items-center gap-5 border rounded-md w-full input input-bordered"
                style={{ height: '3.5rem' }}
              >
                <FormLabel id="gender-label">Gender</FormLabel>

                <RadioGroup row aria-labelledby="gender-label" defaultValue="female" name="gender">
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
              </div>
              {selectedRole === 'student' && <input
                type="number"
                name="age"
                placeholder="Student's age"
                required
                className="input w-full input-bordered"
              />}
            </span>
          </div>
          <FormSubmit className="btn-block mt-3">Add {selectedRole}</FormSubmit>
        </form>
      </div>

      <div></div>
    </>
  );
};

export default AddStudentTeacher;
