"use server"

import { prisma } from "@/lib/db/prisma";
import { TeacherType } from "@/lib/types/types";
import { redirect } from "next/navigation";

export const handleTeacherEdit = async (formData: TeacherType) => {
  const { teacherId, role, gender, firstName, lastName, email} = formData;
  const teacher = await prisma.teacher.findUnique({
    where: {
      teacherId,
    },
  });

  if(teacher) {
    await prisma.teacher.update({
      where: {
        teacherId,
      },
      data: {
        firstName,
        lastName,
        gender,
        email
      }
    })

    redirect(`/all-students`)
  }

  // return teacher;
}