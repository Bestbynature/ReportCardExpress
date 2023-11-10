import { ScoreObjectType3 } from '@/lib/types/types';
import React from 'react'

type ResultProp2 = {
  student: {
    firstName: string;
    lastName: string;
    profilePhotoUrl: string;
    studentId: string;
    gender: string;
    currentClass: string;
    age: number;
  } | null;
  result: ScoreObjectType3
  setTotal: () => number
}

const ResultPDF2 = ({student, result, setTotal}: ResultProp2) => {
  return (
    <div>ResultPDF2</div>
  )
}

export default ResultPDF2