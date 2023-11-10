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
import { useSearchParams } from 'next/navigation'

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

const UpdateStudentComp = (
//   {
//   searchParams: {
//     firstName,
//     lastName,
//     age,
//     gender,
//     parentEmail,
//     parentPhoneNumber,
//     profilePhotoUrl,
//     currentClass,
//     currentSession,
//     studentId,
//   },
// }: EditPageProps
) => {

  const searchParams = useSearchParams()
 
  const firstName = searchParams.get('firstName')
  const lastName = searchParams.get('lastName')
  const age = searchParams.get('age')
  const gender = searchParams.get('gender')
  const parentEmail = searchParams.get('parentEmail')
  const parentPhoneNumber = searchParams.get('parentPhoneNumber')
  const profilePhotoUrl = searchParams.get('profilePhotoUrl')
  const currentClass = searchParams.get('currentClass')
  const currentSession = searchParams.get('currentSession')
  const studentId = searchParams.get('studentId')

  const [formState, setFormState] = React.useState({
    firstName: firstName || '',
    lastName: lastName || '',
    parentEmail: parentEmail || '',
    parentPhoneNumber: parentPhoneNumber || '',
    currentClass: currentClass || '',
    currentSession: currentSession || '',
    age: age || '',
    gender: gender || '',
    profilePhotoUrl: profilePhotoUrl || '',
    studentId: studentId || '',
  });

  const handleImageChange = (newImageUrl: string) => {
    // Update the formState with the new imageUrl
    setFormState({ ...formState, profilePhotoUrl: newImageUrl });
  };

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
      name: 'StudentId',
      placeholder: "Student's Id",
      type: 'hidden',
      value: formState.studentId || '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Update a Student Record</h1>
      <form onSubmit={handleSubmit}>
        <UploadStudentImage profilePhotoUrl={profilePhotoUrl} onImageChange={handleImageChange}/>

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
        <UpdateSendButton formState={formState} />
      </form>
    </div>
  );
};

export default UpdateStudentComp;
