
import React from 'react'
import UploadResultpage from './UploadResult';
import { validateUser } from '../add-student-teacher/page';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Unauthorised from '@/components/Unauthorised';

const UploadResultPageServer = async () => {

  const session = await getServerSession(authOptions)

  const validity = session? await validateUser(session) : 'noRole'

  if(validity === 'noRole' || validity === 'studentRole'){
    return (
      <Unauthorised />
    )
  }

  return (
    <>
    <UploadResultpage />
    </>
  )
}

export default UploadResultPageServer