"use client";

import React from 'react' 
import { usePathname } from 'next/navigation'
import { agbalumo } from '@/lib/fonts';

const CurrentPage = () => {
  const pathname = usePathname();

  return (
    <div className={`${agbalumo.className} text-lg`}><p> You are currently on {pathname.length > 1 ? pathname.slice(1) : 'Home'} page </p></div>
  )
}

export default CurrentPage