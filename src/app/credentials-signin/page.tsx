'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getProviders } from 'next-auth/react';

type Props = {
  callbackUrl?: string;
  signinError: string;
}

// const ListProviders = () => {
 
// };

// export default ListProviders
export default function SignIn({callbackUrl, signinError}: Props) {

  const router = useRouter();

  const [error, setError] = React.useState('');

  const [providers, setProviders] = useState<Record<string, any>>({});

  const [form, setForm] = React.useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        username: form.username,
        password: form.password,
        redirect: true,
        callbackUrl: callbackUrl ?? '/',
      });

      if (res?.error) {
        setError(res.error);
        return;
      }
      router.replace('/')
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const fetchedProviders = await getProviders();
        setProviders(fetchedProviders ?? {});
      } catch (error) {
        console.error('Error fetching providers:', error);
        // Handle the error if needed
      }
    };

    fetchProviders();
  }, []);


return (
    <div className="grid place-items-center h-screen">

{Object.values(providers).map((provider) => {
        return (
          <div key={provider}>
            <button onClick={() => signIn(provider)}>
              Sign in with {provider}
            </button>
          </div>
        );
      })}
      
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        {!!signinError && (<p className='bg-red-100 text-red-600 text-center p-2'>Authentication failed</p>)}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 btn btn-primary"
          >
            Login
          </button>

          <Link href="/" className="text-sm mt-3 text-right btn btn-secondary">
             Cancel
          </Link>

          <div>
            {/* <button 
            onClick={()=>router.push('/api/auth/signin/')} 
            className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2"
            >Sign in With Google</button> */}
            <a
          href="/api/auth/signin?callbackUrl=/"
          className="btn btn-secondary my-4 bg-blue-600 text-white font-bold cursor-pointer px-6 py-2"
        >
          Sign In with Google
        </a>
          </div>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href={'/register'}>
            {`Don't Have an account?`}
            <span className="underline ">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};


// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   }
// }