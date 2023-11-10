import React from 'react';
import UpdateTeacherRecord from './UpdateTeacherRecord';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { validateUser } from '../add-student-teacher/page';
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

  const validity = session? await validateUser(session) : 'noRole'

  if(validity === 'noRole' || validity === 'studentRole'){
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
