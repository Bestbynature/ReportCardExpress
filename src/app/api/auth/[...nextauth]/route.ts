import { prisma } from '@/lib/db/prisma';
import { env } from '@/lib/env';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        userName: { label: 'Username', type: 'text', placeholder: 'firstname and lastname' },
        password: { label: 'Password', type: 'password', placeholder: 'your given password' },
      },
      async authorize(credentials) {
        // const { userName, password } = credentials;

        if (!credentials) return null;

        const foundUser = await prisma.student.findFirst({
          where: {
            userName: credentials?.userName,
          },
        });

        if (!foundUser) return null;

        console.log('Student Exists', foundUser);
        const match = await bcrypt.compare(credentials.password, foundUser?.admissionNumber);

        if (!match) return null;

        console.log('Password Matched', match);
        return {
          id: foundUser.studentId,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          userName: foundUser.userName,
          admissionNumber: foundUser.admissionNumber,
          gender: foundUser.gender,
          profilePhotoUrl: foundUser.profilePhotoUrl,
          role: foundUser.role,
          currentClass: foundUser.currentClass,
          currentSession: foundUser.currentSession,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/credentials-signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && !session.user.name) {
        const additionalUserData = await prisma.student.findUnique({
          where: {
            studentId: token.sub,
          },
        });

        session.user.name = additionalUserData?.firstName + ' ' + additionalUserData?.lastName;
        session.user.email = additionalUserData?.userName;
        session.user.image = additionalUserData?.profilePhotoUrl;
        session.user.role = additionalUserData?.role;
        return session;
      } else {
        const emailUser = await prisma.teacher.findFirst({
          where: {
            email: session.user.email,
          },
        });

        if (emailUser) {
          session.user.role = emailUser.role;
        }

        return session;
      }
    },
  },
  // events: {
  //   async signIn({ user, account, profile, isNewUser }) {},
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
