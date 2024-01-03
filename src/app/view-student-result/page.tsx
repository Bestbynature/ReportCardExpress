import React from 'react';
import StudentResultpage from './StudentResultPage';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Unauthorised from '@/components/Unauthorised';

const StudentResultPageServer = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== 'studentRole' || session?.user.role !== 'adminRole') {
    return <Unauthorised />;
  }

  return (
    <>
      <StudentResultpage />
    </>
  );
};

export default StudentResultPageServer;
