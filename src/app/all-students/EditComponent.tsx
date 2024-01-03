"use client"

import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useTransition } from 'react';

type EditProps = {
  id: string;
  editStudent: (id: string) => void;
};

const EditComponent = ({id, editStudent}: EditProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      title="Edit student"
      
      className={`w-10 h-10 hover:bg-gray-500 rounded-full flex items-center justify-center cursor-pointer ${
        isPending ? 'pointer-events-none opacity-50 loading loading-spinner loading-sm' : ''} `}
      onClick={()=>{
        if (!isPending) {
          startTransition( () => {
            editStudent(id);
          });
        }
      }}
    >
      <EditIcon color="primary"  />
    </div>
  );
};

export default EditComponent;
