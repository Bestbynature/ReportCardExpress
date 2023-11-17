"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter()
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    fullname: ''
  });
  const [error, setError] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.username === '' || form.password === '' || form.fullname === '') {
      setError('Please fill all the fields');
      return;
    }

    try {

      const resh = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.username)
      })

      const {check} = await resh.json();
      if(check){
        setError('Username already exists');
        return;
      }

      // make a request to the server
     const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
       if(res.ok) {
        const formData = event.target as HTMLFormElement
        formData.reset();
        router.push('/extra')
       }else{
        console.log('User registration failed')
       }
    } catch (error) {
      console.log("Error during registration: ", error)
    }

    setError('');
    console.log(form);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form 
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
        >
          <input 
          type="text" 
          placeholder="Username"
          onChange={handleChange}
          name='username'
          />
          <input type="text" 
          placeholder="Full name" 
          onChange={handleChange}
          name='fullname'
          />

          <input
           type="password" 
          placeholder="Password"
          onChange={handleChange}
          name='password'
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

         { error && (<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>)}

          <Link className="text-sm mt-3 text-right" href={'/extra'}>
            {`Already have an account?`}
            <span className="underline ">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
