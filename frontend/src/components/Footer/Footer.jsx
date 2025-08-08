import React from 'react'
import logo from '../../assets/logo/logo.svg'
import { FaStar } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className='bg-black mt-36 max-h-screen'>
            <div className='w-[95%] mx-auto pt-8'>
                <div className="bg-red-800 w-fit text-white rounded-2xl flex items-center 
                    font-semibold text-center py-2 px-2 shadow-lg mx-auto lg:mx-0">
                    <FaStar className="text-yellow-400 bg-red-600 p-1 rounded-full text-xl mx-2" />
                    <span className="text-sm">
                        Hoàng Sa & Trường Sa là của Việt Nam!
                    </span>
                </div>

                
                <div className='w-full py-8 flex justify-center lg:justify-start'>
                    <img src={logo} className='w-[50%] md:w-[25%] lg:w-[10%]' alt="logo" />
                </div>

                <div className='text-white text-xs md:text-sm font-normal md:font-semibold space-y-4'>
                    <ul className='flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2'>
                        <li><a className='cursor-pointer hover:text-amber-300'>Hỏi-Đáp</a></li>
                        <li><a className='cursor-pointer hover:text-amber-300'>Chính sách bảo mật</a></li>
                        <li><a className='cursor-pointer hover:text-amber-300'>Điều khoản sử dụng</a></li>
                        <li><a className='cursor-pointer hover:text-amber-300'>Giới thiệu</a></li>
                        <li><a className='cursor-pointer hover:text-amber-300'>Liên hệ</a></li>
                    </ul>

                    <ul className='flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2'>
                        <li><a className='cursor-pointer hover:text-amber-300'>Dongphim</a></li>
                        <li><a className='cursor-pointer hover:text-amber-300'>Ghienphim</a></li>
                        <li><a className='cursor-pointer hover:text-amber-300'>Motphim</a></li>
                        <li><a className='cursor-pointer hover:text-amber-300'>Subnhanh</a></li>
                    </ul>
                </div>

       
                <p className='text-sm text-gray-400 py-6 text-center lg:text-left'>
                    RoPhim – Phim hay cả rổ - Trang xem phim online chất lượng cao miễn phí Vietsub,
                    thuyết minh, lồng tiếng full HD.<br />
                    Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như
                    Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan,<br />
                    Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
                    <br /> © 2024 RoPhim
                </p>
            </div>
        </footer>
    )
}
