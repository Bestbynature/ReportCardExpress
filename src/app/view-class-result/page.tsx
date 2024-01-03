import React from 'react';
import ViewResultPage from './ViewClassResultPage';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Unauthorised from '@/components/Unauthorised';

const ViewClassResultServer = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role === 'studentRole') {
    return <Unauthorised />;
  }

  return (
    <>
      <ViewResultPage userRole={session?.user.role === 'adminRole' ? 'adminRole' : session?.user.email} />
    </>
  );
};

export default ViewClassResultServer;
