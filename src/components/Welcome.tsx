import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';

const Welcome = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="text-center bg-black text-white w-[95%] sm:w-full mt-2">
      <div className="marquee">
        <span className='text-left mr-44'>Welcome {session?.user.name || ''}</span>
        <span className='text-right'>{ session ? `${session?.user.email} with ${session?.user.role}` : 'Logged out.'}</span>
        </div>
    </div>
  );
};

export default Welcome;
