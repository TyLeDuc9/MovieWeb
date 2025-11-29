import React, { useEffect, useState } from 'react';
import { Title } from '../Title/Title';
import {
  FaHeart,
  FaPlus,
  FaClock,
  FaUser,
  FaSignOutAlt,
  FaMars,
  FaVenus,
} from 'react-icons/fa';
import { MdAllInclusive } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { setActiveTab } from '../../redux/userTabSlice';

export const UserNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const activeTab = useSelector((state) => state.userTab.activeTabKey);
  const userId = currentUser?.user?.id || currentUser?.user?._id;

  const [avatar, setAvatar] = useState(
    localStorage.getItem(`avatar_user_${userId}`) ||
    'https://i.pinimg.com/1200x/14/dc/03/14dc031c7e4c67728100119f24208deb.jpg'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newAvatar = localStorage.getItem(`avatar_user_${userId}`);
      if (newAvatar && newAvatar !== avatar) {
        setAvatar(newAvatar);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [userId, avatar]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const tabs = [
    { id: 1, name: 'Yêu thích', icon: <FaHeart />, path: '/user/favorite' },
    { id: 2, name: 'Danh sách', icon: <FaPlus />, path: '#' },
    { id: 3, name: 'Xem tiếp', icon: <FaClock />, path: '#' },
    { id: 4, name: 'Tài khoản', icon: <FaUser />, path: '/user/profile' },
  ];

  const handleTabClick = (id, path) => {
    dispatch(setActiveTab(id));
    navigate(path);
  };


  return (
    <div className='flex flex-col items-center pt-12'>
      <Title
        title='Quản lý tài khoản'
        className='mb-8'
        linkColor='text-white text-lg font-bold'
      />

      <ul className=' text-white w-full px-4 flex lg:flex-col'>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.path)}
            className={`flex flex-col lg:flex-row  items-center gap-2 py-4 px-2.5 sm:px-10 border-b border-white cursor-pointer text-sm 
            ${activeTab === tab.id ? 'text-amber-200 font-semibold' : 'hover:text-amber-100'}`}
          >
              <span className="text-xs lg:text-lg sm:text-sm">{tab.icon}</span>
              <span className='text-xs lg:text-lg sm:text-sm'>{tab.name}</span>
          </li>
        ))}
      </ul>

      <div className='mt-50 w-full px-4 hidden lg:block '>
        <div>
          <img
            src={avatar}
            alt='Avatar'
            className='h-15 w-15 rounded-full object-cover shadow-md border-2 border-white mt-1'
          />
        </div>
        <p className='text-gray-400 flex my-1 text-sm'>
          {currentUser?.user?.name}
          {currentUser?.user?.gender === 'male' && (
            <FaMars className='text-amber-300 mt-0.5 mx-2 text-lg' />
          )}
          {currentUser?.user?.gender === 'female' && (
            <FaVenus className='text-amber-300 mt-0.5 mx-2 text-lg' />
          )}
          {currentUser?.user?.gender === 'unknown' && (
            <MdAllInclusive className='text-amber-300 mt-0.5 mx-2 text-lg' />
          )}
        </p>
        <p className='text-gray-400 text-sm'>{currentUser?.user?.email}</p>
        <div
          onClick={handleLogout}
          className='flex items-center gap-2 my-4 hover:text-red-500 cursor-pointer text-white'
        >
          <FaSignOutAlt /> Thoát
        </div>
      </div>
    </div>
  );
};
