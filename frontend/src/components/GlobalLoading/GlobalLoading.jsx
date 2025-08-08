import React from 'react';
import { useLoading } from '../../context/LoadingContext';
import logo from '../../assets/logo/logo.svg'; 
export const GlobalLoading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-1000 bg-[#282a39] bg-opacity-50 flex items-center justify-center">
      <div className="">
        <img src={logo} alt="Loading..." className="w-full h-full" />
        <p className='text-gray-300 text-4xl my-6 font-semibold'>Xem Phim Miễn Phí Miễn Cực Nhanh, Chất 
            <br/>Lượng Cao Và Cập Nhật Liên Tục</p>
      </div>
    </div>
  );
};
