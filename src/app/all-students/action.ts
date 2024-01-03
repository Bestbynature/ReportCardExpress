'use server';

import { prisma } from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const deleteStudent = async (studentId: string, profilePhotoUrl: string): Promise<string> => {

  const res = await prisma.student.delete({
    where: {
      studentId,
    },
  });

  const parts = profilePhotoUrl.split('/');

  const fileName = parts[parts.length - 1];

  const { data, error } = await supabase.storage
    .from('students-images')
    .remove([`images/${fileName}`]);

  return res.studentId;
  
  // revalidatePath('/all-students');
};

export const deleteTeacher = async (teacherId: string) => {
  const res = await prisma.teacher.delete({
    where: {
      teacherId,
    },
  });

  return res.teacherId;

  // console.log('successfully deleted teacher');

  // revalidatePath('/all-students');
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
      admissionNumber,
      profilePhotoUrl,
      currentClass,
      currentSession,
      parentPhoneNumber,
    } = student;

    const queryParams = `studentId=${studentId}&firstName=${firstName}&lastName=${lastName}&gender=${gender}&age=${age}&profilePhotoUrl=${profilePhotoUrl}&currentClass=${currentClass}&currentSession=${currentSession}&admissionNumber=${admissionNumber}&parentPhoneNumber=${parentPhoneNumber}`;

    redirect(`/update-student-record?${queryParams}`);
  }
};

export const editTeacherRecord = async (teacherId: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      teacherId,
    },
  });

  if (teacher) {
    const { firstName, lastName, gender, role, email, teacherId } = teacher;

    const queryParams = `firstName=${firstName}&lastName=${lastName}&gender=${gender}&role=${role}&email=${email}&teacherId=${teacherId}`;

    redirect(`/update-teacher-record?${queryParams}`);
  }
};

export const fetchTeachers = async () => {
  const teachers = await prisma.teacher.findMany();

  return teachers;
};

export const editTeacher = async (teacherId: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      teacherId,
    },
  });

  if (teacher) {
    const { firstName, lastName, gender, email, role, teacherId } = teacher;

    const queryParams = `teacherId=${teacherId}&firstName=${firstName}&lastName=${lastName}&gender=${gender}&email=${email}&role=${role}`;

    redirect(`/update-teacher-record?${queryParams}`);
  }
};

export const fetchStudents = async () => {
  const students = await prisma.student.findMany({
    orderBy: {
      firstName: 'asc',
    },
  });

  return students;
};
