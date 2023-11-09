'use server';

import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const deleteStudent = async (studentId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      studentId,
    },
  });

  await prisma.result.deleteMany({
    where: {
      studentId,
    },
  });

  await prisma.student.delete({
    where: {
      studentId,
    },
  });

  const url = student?.profilePhotoUrl || '';

  const parts = url.split('/');

  const fileName = parts[parts.length - 1];

  const { data, error } = await supabase.storage
    .from('students-images')
    .remove([`images/${fileName}`]);

  console.log(data);
  console.log(error);
  revalidatePath('/all-students');
};

export const editStudent = async (studentId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      studentId,
    },
  });

  if (student) {
    const {
      studentId,
      firstName,
      lastName,
      gender,
      age,
      profilePhotoUrl,
      currentClass,
      currentSession,
      parentEmail,
      parentPhoneNumber,
    } = student;

    const queryParams = `studentId=${studentId}&firstName=${firstName}&lastName=${lastName}&gender=${gender}&age=${age}&profilePhotoUrl=${profilePhotoUrl}&currentClass=${currentClass}&currentSession=${currentSession}&parentEmail=${parentEmail}&parentPhoneNumber=${parentPhoneNumber}`;

    redirect(`/update-student-record?${queryParams}`);
  }
};
