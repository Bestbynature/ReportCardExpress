"use server"

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db/prisma';

export const addStudent = async (formData: FormData) => {

  const session = getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-student-teacher');
  }

  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const parentEmail = formData.get('parentEmail')?.toString();
  const parentPhoneNumber = formData.get('parentPhoneNumber')?.toString();
  const currentClass = formData.get('currentClass')?.toString();
  const age = Number(formData.get('age')) || 0;
  const gender = formData.get('gender')?.toString() || '';
  const profilePhotoUrl = formData.get('profilePhotoUrl')?.toString();
  const currentSession = formData.get('currentSession')?.toString();

  try {
    if (
      !firstName ||
      !lastName ||
      !parentEmail ||
      !parentPhoneNumber ||
      !currentClass ||
      !age ||
      !currentSession
    ) {
      throw new Error('All fields are required');
    }

    if (!profilePhotoUrl) {
      throw new Error('Please upload a profile photo');
    }

    const mailCheck = await prisma.teacher.findFirst({
      where: {
        email: parentEmail
      }
    })
  
    if(mailCheck) throw new Error('This email has already been used by a Teacher')

    const newStudent = await prisma.student.create({
      data: {
        firstName,
        lastName,
        parentEmail,
        parentPhoneNumber,
        currentClass,
        age,
        currentSession,
        gender,
        profilePhotoUrl,
      },
    });

    await prisma.result.create({
      data: {
        studentId: newStudent.studentId,
        scoreObject: {
          [currentSession]: {
            'First Term': {
              'First CA': [],
              'Second CA': [],
              'Terminal Examination': [],
            },
            'Second Term': {
              'First CA': [],
              'Second CA': [],
              'Terminal Examination': [],
            },
            'Third Term': {
              'First CA': [],
              'Second CA': [],
              'Terminal Examination': [],
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(error); 
    return 'An error occurred while adding the student. Please try again later.';
  }

  redirect('/all-students');
};

export const addteacher = async (formData: FormData) => {
  const session = getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-student-teacher');
  }

  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const email = formData.get('parentEmail')?.toString();
  const gender = formData.get('gender')?.toString();

  if(!firstName || !lastName || !email || !gender) {
    throw new Error('All fields are required');
  }

  const mailCheck = await prisma.student.findFirst({
    where: {
      parentEmail: email
    }
  })

  if(mailCheck) throw new Error('This email is already being used by a Student')

  const newTeacher = await prisma.teacher.create({
    data: {
      firstName,
      lastName,
      email,
      gender
    }
  });

  if(!newTeacher) {
    throw new Error('An error occurred while adding the teacher. Please try again later.');
  }

  redirect('/all-students');
};