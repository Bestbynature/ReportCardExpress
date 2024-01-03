'use server';

import { prisma } from '@/lib/db/prisma';
import { StudentType3, TeacherType } from '@/lib/types/types';
import { redirect } from 'next/navigation';

export const updatedRecordSender = async (formState: StudentType3) => {

  const { studentId, firstName, lastName, gender, parentPhoneNumber, admissionNumber, currentClass, currentSession, age, profilePhotoUrl } = formState;
  
  const response = await prisma.student.update({
    where: {
      studentId: studentId,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      parentPhoneNumber: parentPhoneNumber,
      admissionNumber: admissionNumber,
      currentClass: currentClass,
      currentSession: currentSession,
      age: Number(age),
      profilePhotoUrl: profilePhotoUrl,
    },
  });

  if (response) redirect('/all-students');
};



export const updatedTeacherRecordSender = async (formState: TeacherType) => {
  const { firstName, lastName, gender, role, teacherId } = formState;

  const response = await prisma.teacher.update({
    where: {
      teacherId: teacherId,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      role: role,
    },
  })

  if (response) redirect('/all-students');
}