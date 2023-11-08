'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import UploadStudentImage from '@/components/UploadStudentImage';
import RHFSelectImplement, { RHFSelect } from '@/components/RHFSelect';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import FormSubmit from '@/components/FormSubmit';
import { StudentType } from '@/lib/types/types';
import { classes, sessions } from '../../../constants';
import UpdateSendButton from './UpdateSendButton';

export interface EditPageProps {
  searchParams: {
    firstName: string;
    lastName: string;
    parentEmail: string;
    parentPhoneNumber: string;
    currentClass: string;
    currentSession: string;
    age: number;
    gender: string;
    profilePhotoUrl: string;
    studentId: string;
  };
}

const UpdateStudentComp = ({
  searchParams: {
    firstName,
    lastName,
    age,
    gender,
    parentEmail,
    parentPhoneNumber,
    profilePhotoUrl,
    currentClass,
    currentSession,
    studentId,
  },
}: EditPageProps) => {

  const [formState, setFormState] = React.useState({
    firstName,
    lastName,
    parentEmail,
    parentPhoneNumber,
    currentClass,
    currentSession,
    age,
    gender,
    profilePhotoUrl,
  });

  // const handleChange = (e: React.ChangeEvent) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Create a FormData object with updated values from the form fields
  //   const updatedFormData = new FormData();
  //   for (const key in formData) {
  //     updatedFormData.append(key, formData[key]);
  //   }
  //   UpdateRecord(updatedFormData); // Call your update function with the updated data
  // };

  const formFields = [
    {
      name: 'firstName',
      placeholder: "Student's first name",
      type: 'text',
      value: formState.firstName,
    },
    {
      name: 'lastName',
      placeholder: "Student's last name",
      type: 'text',
      value: formState.lastName,
    },
    {
      name: 'parentEmail',
      placeholder: "Student's parent email",
      type: 'email',
      value: formState.parentEmail,
    },
    {
      name: 'parentPhoneNumber',
      placeholder: "Student's parent phone number",
      type: 'text',
      value: formState.parentPhoneNumber,
    },
    { name: 'age', placeholder: "Student's age", type: 'number', value: formState.age },
  ];

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Update a Student Record</h1>
      <form>
        <UploadStudentImage profilePhotoUrl={profilePhotoUrl} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {formFields.map((field, index) => (
            <input
              key={index}
              className="input w-full input-bordered"
              required
              name={field.name}
              value={field.value}
              placeholder={field.placeholder}
              type={field.type}
              onChange={(e) => setFormState({ ...formState, [field.name]: e.target.value })}
            />
          ))}

          <RHFSelect
            label="currentClass"
            name="currentClass"
            value={formState.currentClass}
            options={classes}
            onChange={(e) => setFormState({ ...formState, currentClass: e.target.value })}
          />

          <RHFSelect
            label="currentSession"
            name="currentSession"
            value={formState.currentSession}
            options={sessions}
            onChange={(e) => setFormState({ ...formState, currentSession: e.target.value })}
          />

          <span className="flex flex-col items-center gap-4">
            <div
              className="flex items-center gap-5 border rounded-md w-full input input-bordered"
              style={{ height: '3.5rem' }}
            >
              <FormLabel id="gender-label">Gender</FormLabel>

              <RadioGroup
                row
                aria-labelledby="gender-label"
                defaultValue={formState.gender}
                name="gender"
                onChange={(e) => {
                  setFormState({ ...formState, gender: e.target.value });
                }}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </div>
          </span>
        </div>
        <UpdateSendButton formState={(()=>{
          const formStateData = {...formState, studentId}
          return formStateData
        })()} />
        {/* <FormSubmit className="btn-block mt-3">Update Student Record</FormSubmit> */}
      </form>
    </div>
  );
};

export default UpdateStudentComp;
