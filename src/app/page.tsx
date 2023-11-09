'use client';

import ImageCardLink from '@/components/ImageCardLink';
import { landingPageInfo } from '../../constants';

const LandingPage = () => {
  return (
    <div className="items-center border-gray-300">
      <div className="mb-5">
        <h1 className="font-bold text-3xl">Welcome!</h1>
        <p className='text-lg'>Choose one of the options below to continue</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {landingPageInfo.map((info) => (
          <ImageCardLink {...info} key={info.id} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
