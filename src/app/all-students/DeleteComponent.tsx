'use client';

import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTransition } from 'react';

type DeleteStudentProp = {

  
  studentId: string;
  deleteStudent: (studentId: string) => void;
};

const DeleteComponent = ({ studentId, deleteStudent }: DeleteStudentProp) => {

  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={`w-10 h-10 hover:bg-gray-500 rounded-full flex items-center justify-center ${
        isPending ? 'pointer-events-none opacity-50' : ''} `}
      title="Delete student"
      onClick={
        () => {
          if (!isPending) {
            startTransition(async () => {
              await deleteStudent(studentId);
            });
          }
        }
      }
    >
      <DeleteForeverIcon color="error" />
    </div>
  );
};

export default DeleteComponent;
