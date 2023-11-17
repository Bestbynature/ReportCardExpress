import { prisma } from "@/lib/db/prisma";
import {NextResponse } from 'next/server';

export async function POST(req:  { json: () => Promise<{ username: string, password: string, fullname: string }> }){
  try {
    const {username} = await req.json();

    const check = await prisma.user.findFirst({
      where: {
        username
      }
    })

    return NextResponse.json({check})

  }catch(error){
    console.log(error)
  }
 
}