'use client';

import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

type DeleteStudentProp = {
  studentId: string;
  deleteStudent: (studentId: string, profilePhotoUrl: string) => Promise<string>;
  profilePhotoUrl?: string;
  updateScreen?: (studentId: string) => void;
};

const DeleteComponent = ({ studentId, deleteStudent, updateScreen, profilePhotoUrl }: DeleteStudentProp) => {
 const router = useRouter()
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={`w-10 h-10 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer ${
        isPending ? 'pointer-events-none opacity-50 loading loading-spinner loading-sm' : ''} `}
      title="Delete student"
      onClick={
        () => {
          if (!isPending) {
            startTransition( async () => {
              const item = await deleteStudent(studentId, profilePhotoUrl || '');
                updateScreen && updateScreen(item)
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
