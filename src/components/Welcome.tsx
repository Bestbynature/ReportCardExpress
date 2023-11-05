import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';

const Welcome = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="text-center bg-black text-white">
      <div className="marquee">
        <span className='text-left mr-44'>Welcome, {session?.user.name || ''}</span>
        <span className='text-right'>{session?.user.email || 'You are yet to sign in.'}</span>
        </div>
    </div>
  );
};

export default Welcome;
