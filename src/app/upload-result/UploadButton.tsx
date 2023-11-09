'use client';

import { UploadButtonProps } from '@/lib/types/types';
import { useState, useTransition } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const UploadButton = ({ scores, formValues, uploadResultAction }: UploadButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2 mt-3 w-full">
      <button
        className="btn btn-secondary"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await uploadResultAction({scores, formValues});
            setSuccess(true);
          });
        }}
      >
        Upload Result to Server
        <CloudUploadIcon />
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && <span className="text-green-500">Result Uploaded Successfully</span>}
    </div>
  );
};

export default UploadButton;
