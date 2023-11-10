'use client';

import { useState, useTransition } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TeacherType } from '@/lib/types/types';
import { handleTeacherEdit } from './action';

type TeacherType2 = {
  data: TeacherType;
};

const UpdateTeacherButton = (data: TeacherType2) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2 mt-3 w-full border-4">
      <button
        className="btn btn-secondary w-full"
        disabled={isPending}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await handleTeacherEdit(data.data);
            setSuccess(true);
          });
        }}
      >
        {`Edit Teacher's Record`}
        <CloudUploadIcon />
      </button>
      <div>
        {isPending && <span className="loading loading-spinner loading-md" />}
        {!isPending && success && (
          <span className="text-green-500"> Record Editted Successfully</span>
        )}
      </div>
    </div>
  );
};

export default UpdateTeacherButton;
