'use server';

import { prisma } from '@/lib/db/prisma';
import { BaseketType2, BasketType, ExtendedParsedResultsType, FormValuesType, ScoreArrayType } from '@/lib/types/types';

export const fetchClassResults = async (data: FormValuesType) => {
  const { currentSession, currentTerm, class: className, examination, subject } = data;

  const results = await prisma.result.findMany({
    where: {
      student: {
        currentClass: className,
      },
    },
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          profilePhotoUrl: true,
          studentId: true,
          gender: true,
        },
      },
    },
  });

  const parsedResults: ExtendedParsedResultsType[] = JSON.parse(JSON.stringify(results));
  const basket: BasketType[] = [];
  const basket2: BaseketType2[] = [];

  parsedResults.forEach((result) => {
    const { scoreObject, student } = result;

    if (!examination) {
      const scoreArray: ScoreArrayType[] = []; 
      const worksite = scoreObject[currentSession][currentTerm];
      for (const key in worksite) {
        const index = worksite[key].findIndex((item: any) => item.hasOwnProperty(subject));
        if (index !== -1) scoreArray.push({[key]: worksite[key][index][subject]});
      }
      const studentScore = {
        student: student,
        scoreArray: scoreArray,
      };

      basket2.push(studentScore);
    } else {
      let score: string = 'Unassigned';
      const worksite = scoreObject[currentSession][currentTerm][examination];
      const keyToCheck = subject;
      const index = worksite.findIndex((item: any) => item.hasOwnProperty(keyToCheck));
      if (index !== -1) {
        score = worksite[index][subject];
      }

      const studentScore = {
        student: student,
        score: score,
      };

      basket.push(studentScore);
    }
  });

  if (!examination) return basket2;
  return basket;
};
