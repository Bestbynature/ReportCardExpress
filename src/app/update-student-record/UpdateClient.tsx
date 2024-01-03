'use client';

import * as React from 'react';
import UploadStudentImage from '@/components/UploadStudentImage';
import { RHFSelect } from '@/components/RHFSelect';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { classes, sessions } from '../../../constants';
import UpdateSendButton from './UpdateSendButton';
import { useSearchParams } from 'next/navigation';
import studentImage from '../../assets/add-a-student-image.jpg';
import Image from 'next/image';

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

const UpdateStudentComp = () => {
  const searchParams = useSearchParams();

  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const age = searchParams.get('age');
  const gender = searchParams.get('gender');
  const parentPhoneNumber = searchParams.get('parentPhoneNumber');
  const profilePhotoUrl = searchParams.get('profilePhotoUrl');
  const currentClass = searchParams.get('currentClass');
  const currentSession = searchParams.get('currentSession');
  const studentId = searchParams.get('studentId');
  const admissionNumber = searchParams.get('admissionNumber');

  const [formState, setFormState] = React.useState({
    firstName: firstName || '',
    lastName: lastName || '',
    parentPhoneNumber: parentPhoneNumber || '',
    currentClass: currentClass || '',
    currentSession: currentSession || '',
    admissionNumber: admissionNumber || '',
    age: age || '',
    gender: gender || '',
    profilePhotoUrl: profilePhotoUrl || '',
    studentId: studentId || '',
  });

  const handleImageChange = (newImageUrl: string) => {
    setFormState({ ...formState, profilePhotoUrl: newImageUrl });
  };

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
      name: 'admissionNumber',
      placeholder: "Student's admission number",
      type: 'hidden',
      value: formState.admissionNumber,
    },
    {
      name: 'StudentId',
      placeholder: "Student's Id",
      type: 'hidden',
      value: formState.studentId || '',
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <UploadStudentImage
              profilePhotoUrl={profilePhotoUrl}
              onImageChange={handleImageChange}
            />
            <Image
              src={studentImage}
              alt="Student logo"
              height={600}
              width={450}
              className="hidden sm:block rounded-lg m-auto"
            />
          </div>
          <div>
            <h1 className="mb-3 text-lg font-bold">Update a Student Record</h1>

            {formFields.map((field, index) => (
              <input
                key={index}
                className="input w-full input-bordered mb-3"
                required
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                type={field.type}
                onChange={(e) => setFormState({ ...formState, [field.name]: e.target.value })}
              />
            ))}
            <div className="mb-4">
              <RHFSelect
                label="currentClass"
                name="currentClass"
                value={formState.currentClass}
                options={classes}
                onChange={(e) => setFormState({ ...formState, currentClass: e.target.value })}
              />
            </div>

            <RHFSelect
              label="currentSession"
              name="currentSession"
              value={formState.currentSession}
              options={sessions}
              onChange={(e) => setFormState({ ...formState, currentSession: e.target.value })}
            />

            <span className="flex flex-col items-center gap-4 mt-3">
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
            <UpdateSendButton formState={formState} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudentComp;
