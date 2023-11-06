'use client';

import { DownloadStudentButtonProps } from '@/lib/types/types';
import { useState, useTransition } from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


const DownloadStudentResultButton = ({ formValues, fetchStudentResult, updateResult}: DownloadStudentButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center w-full">
      <button
        className="btn btn-secondary"
        disabled={isPending}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            const { currentSession, currentTerm, examination } = formValues;
            if(!currentSession || !currentTerm ) return alert('Only the examination field is optional. Kindly fill all fields');
            const studentResults = await fetchStudentResult(formValues);
            setSuccess(true);
            updateResult(studentResults)
          });
        }}
      >
      Download Result from Server
      <CloudDownloadIcon />
      </button>
      {isPending && <span className="loading loading-spinner loading-md">Result is being fetched</span>}
      {!isPending && success && <span className="text-green-500">Result is ready</span>}
    </div>
  );
};

export default DownloadStudentResultButton;
