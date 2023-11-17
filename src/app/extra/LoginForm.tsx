'use client';

import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = React.useState('');

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
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }
      router.replace('dashboard')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

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
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            Login
          </button>

          <div>
            <button onClick={()=>redirect('/api/auth/signIn')}>Sign in With Gmail</button>
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

export default LoginForm;
