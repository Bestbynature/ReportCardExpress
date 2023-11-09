"use server"

import { ExtendedParsedResultsType, ExtendedParsedResultsType2, FormValuesType2, ScoreObjectType3, SessionType } from "@/lib/types/types";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from "@/lib/db/prisma";

export const validateStudent = async () => {
  const session: SessionType = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin?callbackUrl=/view-student-result');

  return session

}

export const fetchStudentResult = async ({currentSession, currentTerm, examination}: FormValuesType2):  Promise<ExtendedParsedResultsType2 | null> => {

  const studentSession = await validateStudent();

  const result = await prisma.result.findFirst({
    where: {
      student: {
        parentEmail: studentSession.user.email,
      },
    },
    include: {
      student: true,
    },
  });

  if(!result) return null;

  const parsedResult: ExtendedParsedResultsType = JSON.parse(JSON.stringify(result));
  
  if(!examination){
    const worksite = parsedResult.scoreObject[currentSession][currentTerm];

    const resultPackage = {
      result: {...worksite},
      student: parsedResult.student
    }

    return resultPackage;
  }else{
    const worksite = parsedResult.scoreObject[currentSession][currentTerm][examination];

    const resultPackage = {
      student: parsedResult.student,
      result: [...worksite]
    }

    return resultPackage;
  }



}