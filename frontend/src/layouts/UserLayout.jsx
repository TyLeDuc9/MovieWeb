import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar/UserNavbar';

export const UserLayout = () => {
  return (
    <div className='grid lg:grid-cols-12 grid-cols-1 min-h-screen'>
      <div className='lg:col-span-3 col-span-1 bg-[#282a39] mt-24 mx-auto 
      lg:w-[90%] lg:h-[95vh] h-[25vh] w-[85%] rounded-2xl overflow-hidden'>
        <UserNavbar />
      </div>
      <div className='lg:col-span-9 col-span-1'>
        <Outlet />
      </div>
    </div>
  );
};
