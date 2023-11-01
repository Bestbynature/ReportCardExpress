"use server"

import { prisma } from "@/lib/db/prisma";
import { UploadResultProps } from "@/lib/types/types";

export const fetchClassStudents = async (value: string) => {
  console.log('value is' + value);
  const response = await prisma.student.findMany({
    where: {
      currentClass: value
    }
  });

  return response;
}



export const uploadResultAction = async ({scores, formValues}: UploadResultProps) => {
scores.forEach( (element) => {
  // const response = await prisma.result.create({
  //   data: {
  //     studentId: element.studentId,
  //     subject: formValues.subject,
  //     term: formValues.term,
  //     score: element.score,
  //     class: formValues.class,
  //     session: formValues.session,
  //   }
  // });
  console.log(element.studentId, element.score, );
})
console.log(formValues.subject, formValues.term, formValues.class, formValues.session)
}