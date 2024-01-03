import React from 'react';
import UpdateTeacherRecord from './UpdateTeacherRecord';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Unauthorised from '@/components/Unauthorised';

type TeacherEditProps = {
  searchParams: {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    role: string;
    teacherId: string;
  };
};

const UpdateTeacherRecordServer = async ({
  searchParams: { firstName, lastName, gender, email, role, teacherId },
}: TeacherEditProps) => {
  const info = {
    firstName,
    lastName,
    gender,
    email,
    role,
    teacherId,
  };

  const session = await getServerSession(authOptions)


  if(session?.user.role !== 'adminRole'){
    return (
      <Unauthorised />
    )
  }



  return (
    <>
      <UpdateTeacherRecord info={info} />
    </>
  );
};

export default UpdateTeacherRecordServer;
