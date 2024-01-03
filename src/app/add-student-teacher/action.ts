"use server"

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import bcrypt, { hash } from 'bcrypt';

export const addStudent = async (formData: FormData) => {

  const session = getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-student-teacher');
  }

  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const parentPhoneNumber = formData.get('parentPhoneNumber')?.toString();
  const currentClass = formData.get('currentClass')?.toString();
  const age = Number(formData.get('age')) || 0;
  const gender = formData.get('gender')?.toString() || '';
  const profilePhotoUrl = formData.get('profilePhotoUrl')?.toString();
  const currentSession = formData.get('currentSession')?.toString();
  const admissionNumber = formData.get('admissionNumber')?.toString();
  // form the username by using firstName.lastName
  const userName = `${firstName}.${lastName}`.toLowerCase();

  let hashedValue = '';
  if(admissionNumber) hashedValue = await bcrypt.hash(admissionNumber, 10);

  try {
    if (
      !firstName ||
      !lastName ||
      !parentPhoneNumber ||
      !currentClass ||
      !age ||
      !currentSession ||
      !hashedValue
    ) {
      throw new Error('All fields are required');
    }

    if (!profilePhotoUrl) {
      throw new Error('Please upload a profile photo');
    }

    const userNameCheck = await prisma.student.findFirst({
      where: {
        admissionNumber: hashedValue
      }
    })
  
    if(userNameCheck) throw new Error('This student already exist')

    const newStudent = await prisma.student.create({
      data: {
        firstName,
        lastName,
        parentPhoneNumber,
        userName,
        admissionNumber: hashedValue,
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

  const firstName = formData.get('firstName')!.toString() 
  const lastName = formData.get('lastName')!.toString();
  const email = formData.get('email')!.toString();
  const gender = formData.get('gender')!.toString();

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