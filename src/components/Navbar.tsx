import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <img
          className='w-[89px] sm:w-[148px] inline-block'
          src='/logo.png'
          alt='logo'
        />
      </Link>
      {user?.email ? (
        <div>
          <Link to='/account'>
            <button className='text-white pr-4'>Account</button>
          </Link>
          <button
            onClick={handleLogOut}
            className='bg-red-600 px-3 sm:px-6 py-2 rounded cursor-pointer text-white'
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <Link to='/login'>
            <button className='text-white pr-4'>Sign In</button>
          </Link>
          <Link to='/sign-up'>
            <button className='bg-red-600 px-3 sm:px-6 py-2 rounded cursor-pointer text-white'>
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
