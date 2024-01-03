import React from 'react';
import UpdateStudentComp from './UpdateClient';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Unauthorised from '@/components/Unauthorised';
import LoadingPage from '../loading';

const UpdateStudentServer = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== 'adminRole') {
    return <Unauthorised />;
  }

  return (
    <>
      <React.Suspense fallback={<LoadingPage />}>
        <UpdateStudentComp />
      </React.Suspense>
    </>
  );
};

export default UpdateStudentServer;
