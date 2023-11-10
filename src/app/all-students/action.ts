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

  // console.log(data);
  // console.log(error);
  revalidatePath('/all-students');
};

export const deleteTeacher = async (teacherId: string) => {

  console.log(teacherId);

  await prisma.teacher.delete({
    where: {
      teacherId,
    },
  });

  console.log('successfully deleted teacher')

  revalidatePath('/all-students');
}

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

export const editTeacherRecord = async (teacherId: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      teacherId,
    },
  })

  if(teacher){
    const { firstName, lastName, gender, role, email, teacherId } = teacher;

    const queryParams = `firstName=${firstName}&lastName=${lastName}&gender=${gender}&role=${role}&email=${email}&teacherId=${teacherId}`;

    redirect(`/update-teacher-record?${queryParams}`);
  }
}

export const fetchTeachers = async () => {
  const teachers = await prisma.teacher.findMany();

  return teachers;
}

export const editTeacher = async (teacherId: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      teacherId,
    },
  })

  if(teacher){
    const { firstName, lastName, gender, email, role, teacherId } = teacher;

    const queryParams = `teacherId=${teacherId}&firstName=${firstName}&lastName=${lastName}&gender=${gender}&email=${email}&role=${role}`;

    redirect(`/update-teacher-record?${queryParams}`);
  }
}