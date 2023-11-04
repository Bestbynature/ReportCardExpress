'use client';

import { DownloadButtonProps, UploadButtonProps } from '@/lib/types/types';
import { useState, useTransition } from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


const DownloadButton = ({ formValues, fetchClassResults, updateResult}: DownloadButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2 mt-3 w-full">
      <button
        className="btn btn-secondary"
        disabled={isPending}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            const { currentSession, currentTerm, class: className, subject } = formValues;
            if(!currentSession || !currentTerm || !className || !subject) return alert('Only the examination field is optional. Kindly fill all fields');
            const studentResults = await fetchClassResults(formValues);
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

export default DownloadButton;
