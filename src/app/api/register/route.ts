import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: {
  json: () => Promise<{ username: string; password: string; fullname: string }>;
}) {
  try {
    const { username, password, fullname } = await req.json();

    // console.log(username, password, fullname)
    const hashedpwd = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashedpwd,
        fullname,
      },
    });

    return NextResponse.json({ message: 'User registered.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occured while registering.' }, { status: 500 });
  }
}
