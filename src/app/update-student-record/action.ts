'use server';

import { prisma } from '@/lib/db/prisma';
import { StudentType2 } from '@/lib/types/types';
import { redirect } from 'next/navigation';

// export const updatedRecordSender = async (formState: StudentType2) => {

//   console.log(formState.formState)
//   const response = await prisma.student.update({
//     where: {
//       studentId: formState.formState.studentId,
//     },
//     data: {
//       firstName: formState.formState.firstName,
//       lastName: formState.formState.lastName,
//       gender: formState.formState.gender,
//       parentPhoneNumber: formState.formState.parentPhoneNumber,
//       parentEmail: formState.formState.parentEmail,
//       currentClass: formState.formState.currentClass,
//       currentSession: formState.formState.currentSession,
//       age: Number(formState.formState.age),
//       profilePhotoUrl: formState.formState.profilePhotoUrl,
//     },
//   });

//   if(response) redirect('/all-students')

// };

export const updatedRecordSender = async (formState: StudentType2) => {
  const { studentId, firstName, lastName, gender, parentPhoneNumber, parentEmail, currentClass, currentSession, age, profilePhotoUrl } = formState;

  const response = await prisma.student.update({
    where: {
      studentId: studentId,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      parentPhoneNumber: parentPhoneNumber,
      parentEmail: parentEmail,
      currentClass: currentClass,
      currentSession: currentSession,
      age: age,
      profilePhotoUrl: profilePhotoUrl,
    },
  });

  if (response) redirect('/all-students');
};
