'use client';

import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

type FormSubmitProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<'button'>;

const FormSubmit = ({ children, className, ...props }: FormSubmitProps) => {
  const { pending } = useFormStatus();
  const [success, setSuccess] = useState(false);
  const [trigger, setTrigger] = useState<Number[]>([]);

  // const SuccessFunction = useCallback(() => {
  //   if (pending) {
  //     setTrigger([...trigger, 1]);
  //   } else {
  //     setTrigger([...trigger, 0]);
  //   }

  //   if (trigger.length > 2) {
  //     trigger.shift();
  //     if (trigger[0] === 0 && trigger[1] === 1) {
  //       setSuccess(true);
  //     }
  //   }
  // }, [pending, trigger]);

  // useEffect(() => {
  //   // SuccessFunction();
  // }, [pending, SuccessFunction]);

  return (
    <>
    <button {...props} className={`btn btn-primary ${className}`} type="submit" disabled={pending}>
      {pending && <span className="loading loading-spinner">Please wait...</span>}
      {children}
    </button>
    {!pending && success && <span className="text-green-500"> Action Successful</span>}
    </>
  );
};

export default FormSubmit;
