import React from 'react';
import StudentResultpage from './StudentResultPage';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { validateUser } from '../add-student-teacher/page';
import Unauthorised from '@/components/Unauthorised';

const StudentResultPageServer = async () => {
  const session = await getServerSession(authOptions);

  const validity = session ? await validateUser(session) : 'noRole';

  if (validity === 'noRole' || validity === 'teacherRole') {
    return <Unauthorised />;
  }
  return (
    <>
      <StudentResultpage />
    </>
  );
};

export default StudentResultPageServer;
