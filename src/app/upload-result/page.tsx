
import React from 'react'
import UploadResultpage from './UploadResult';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Unauthorised from '@/components/Unauthorised';

const UploadResultPageServer = async () => {

  const session = await getServerSession(authOptions)


  if(session?.user.role === 'studentRole'){
    return (
      <Unauthorised />
    )
  }

  return (
    <>
    <UploadResultpage userRole={session?.user.role } />
    </>
  )
}

export default UploadResultPageServer