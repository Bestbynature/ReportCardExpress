'use client';

import { StudentType2, UploadButtonProps } from '@/lib/types/types';
import { useState, useTransition } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { updatedRecordSender } from './action';
import { redirect } from 'next/navigation';


const UpdateSendButton = ({formState
}: StudentType2) => {

  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2 mt-3">
      <button
        className="btn btn-secondary w-full"
        disabled={isPending}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
        
            await updatedRecordSender(formState);
            setSuccess(true);
          });
        }}
      >
        Edit Student Record
        <CloudUploadIcon />
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && <span className="text-green-500">Student Record Editted Successfully</span>}
    </div>
  );
};

export default UpdateSendButton;
