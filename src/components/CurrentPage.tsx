"use client";

import React from 'react' 
import { usePathname } from 'next/navigation'
import { agbalumo } from '@/lib/fonts';

const CurrentPage = () => {
  const pathname = usePathname();

  return (
    <div className={`${agbalumo.className} text-lg`}>You are currently on {pathname.slice(1)} page</div>
  )
}

export default CurrentPage