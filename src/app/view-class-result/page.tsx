import React from 'react'
import ViewResultPage from './ViewClassResultPage';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { validateUser } from '../add-student-teacher/page';
import Unauthorised from '@/components/Unauthorised';

const ViewClassResultServer = async () => {

  const session = await getServerSession (authOptions)

  const validity = session? await validateUser(session) : 'noRole'

  if(validity === 'noRole' || validity === 'studentRole'){
    return (
      <Unauthorised />
    )
  }

  return (
    <>
    <ViewResultPage />
    </>
  )
}

export default ViewClassResultServer