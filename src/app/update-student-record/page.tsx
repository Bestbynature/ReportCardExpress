import React from 'react';
import UpdateStudentComp from './UpdateClient';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { validateUser } from '../add-student-teacher/page';
import Unauthorised from '@/components/Unauthorised';

const UpdateStudentServer = async () => {
  const session = await getServerSession(authOptions)
  const validity = session? await validateUser(session) : 'noRole'

  if(validity === 'noRole' || validity === 'studentRole'){
    return (
      <Unauthorised />
    )
  }
  
  return (
    <>
      <UpdateStudentComp />
    </>
  );
};

export default UpdateStudentServer;
