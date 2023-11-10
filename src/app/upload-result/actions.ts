'use server';

import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { ParsedResultsType, ScoreObjectType, UploadResultProps } from '@/lib/types/types';

export const fetchClassStudents = async (value: string) => {
  const response = await prisma.student.findMany({
    where: {
      currentClass: value,
    },
  });

  return response;
};

export const uploadResultAction = async ({ scores, formValues }: UploadResultProps) => {
  const { currentSession, currentTerm, examination, subject } = formValues;

  const existingResults = await prisma.result.findMany({
    where: {
      student: {
        currentClass: formValues.class,
      },
    },
  });
  
  const parsedResults: ParsedResultsType = JSON.parse(JSON.stringify(existingResults));
  
  parsedResults.forEach(async (result) => {
    const { studentId, scoreObject, resultId } = result;

    const studentScore = scores.find((score) => score.studentId === studentId)?.score;

    const updatedResult = scoreObject

    const workSite = updatedResult[currentSession][currentTerm][examination]

    const keyToCheck = subject

    const isContainKey = workSite.some((item: any) => item.hasOwnProperty(keyToCheck))
    // const isContainKey = workSite.some((item: any) => keyToCheck in item)

    if(isContainKey && studentScore){
      const index = workSite.findIndex((item: any) => item.hasOwnProperty(keyToCheck))
      workSite[index][subject] = studentScore
    }else if(!isContainKey && studentScore) {
      workSite.push({[subject]: studentScore})
    }

    const finalResult = await prisma.result.update({
      where: {
        resultId,
      },
      data: {
        scoreObject: updatedResult,
      },
    })
  })
};


// export const validateUser = async () => {
//   const session = getServerSession(authOptions);

//   if (!session) {
//     redirect('/api/auth/signin?callbackUrl=/upload-result');
//   }

//   return session;
// };