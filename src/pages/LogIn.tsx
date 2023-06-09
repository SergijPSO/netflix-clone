import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    try {
      await logIn({ email, password });
      navigate("/");
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className='w-full h-screen mt-[-26px]'>
      <img
        className='hidden sm:block absolute w-full h-full object-cover'
        src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
        alt='/'
      />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
      <div className='fixed w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Sign In</h1>

            {error && <p className='p-3 bg-red-800 my-2 rounded'>{error}</p>}

            <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
              <input
                onChange={handleEmailChange}
                value={email}
                className='p-3 my-2 bg-gray-700 rounded'
                type='email'
                placeholder='email'
                autoComplete='email'
              />
              <input
                onChange={handlePasswordChange}
                value={password}
                className='p-3 my-2 bg-gray-700 rounded'
                type='password'
                placeholder='password'
                autoComplete='current-password'
              />
              <button className='bg-red-600 py-3 my-6 rounded font-bold'>
                Sign In
              </button>

              <div className='flex justify-between items-center text-sm text-gray-600'>
                <p>
                  <input className='mr-2' type='checkbox' />
                  Remember me
                </p>
                <p>Need help?</p>
              </div>
              <p className='py-8'>
                <span className='text-gray-600'>New to Netflix? </span>{" "}
                <Link to='/sign-up'>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
