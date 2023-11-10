import React from 'react'
import AddStudentTeacher from './AddStudentTeacher';
import { authOptions } from '../api/auth/[...nextauth]/route';
import {getServerSession} from 'next-auth/next'
import { prisma } from '@/lib/db/prisma';
import { Session } from 'next-auth';
import Unauthorised from '@/components/Unauthorised';

export const validateUser = async (session: Session) => {

  if(session?.user?.email) {
    const student = await prisma.student.findFirst({
      where: {
        parentEmail: session?.user?.email
      }
    })

    if(student){
      return 'studentRole'
    }else{
      const teacher = await prisma.teacher.findFirst({
        where: {
          email: session?.user?.email
        }
      })
      if(teacher){
        return 'teacherRole'
      }else{
        return 'noRole'
      }
    }
  }
}

const AddStudentTeacherServer = async () => {

  const session = await getServerSession(authOptions);

  const validity = session? await validateUser(session) : 'noRole'

  if(validity === 'noRole' || validity === 'studentRole'){
    return (
      <Unauthorised />
    )
  }
  
  return (
    <div>
      <AddStudentTeacher />
    </div>
  )
}

export default AddStudentTeacherServer