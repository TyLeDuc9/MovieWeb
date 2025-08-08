import React from 'react';
import { FaHeart, FaPlus, FaClock, FaUser, FaSignOutAlt, FaMars, FaVenus } from 'react-icons/fa';
import { MdAllInclusive } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom';
import { setActiveTab } from '../../redux/userTabSlice';

export const UserDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleClickTab=(id, path)=>{
    dispatch(setActiveTab(id))
    navigate(path)
  }
  const tabs = [
    { id: 1, name: 'Yêu thích', icon: <FaHeart />, path: '/user/favorite' },
    { id: 2, name: 'Danh sách', icon: <FaPlus />, path: '#' },
    { id: 3, name: 'Xem tiếp', icon: <FaClock />, path: '#' },
    { id: 4, name: 'Tài khoản', icon: <FaUser />, path: '/user/profile' },
  ];
  return (
    <div className="absolute lg:-right-8 -right-28 lg:top-full top-8 mt-2 bg-[#282b39] text-white rounded-lg shadow-lg lg:w-48 w-36 z-50 p-4">
      <div className="border-b border-gray-600 pb-3 mb-3">
        <p className="font-semibold flex text-sm">
          {currentUser?.user?.name}
          {currentUser?.user?.gender === 'male' && <FaMars className="text-amber-300 mt-0.5 lg:mx-2 mx-1 lg:text-lg text-sm" />}
          {currentUser?.user?.gender === 'female' && <FaVenus className="text-amber-300 mt-0.5 lg:mx-2 mx-1 lg:text-lg text-sm" />}
          {currentUser?.user?.gender === 'unknown' && <MdAllInclusive className="text-amber-300 mt-0.5 mx-1 lg:mx-2 lg:text-lg text-sm" />}
        </p>
      </div>
      <ul className="lg:space-y-6 space-y-4 lg:text-sm text-xs">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => handleClickTab(tab.id, tab.path)}
            className="flex items-center gap-2 hover:text-amber-400 cursor-pointer"
          >
            {tab.icon} {tab.name}
          </li>
        ))}
        <li
          onClick={handleLogout}
          className="flex items-center gap-2 hover:text-red-500 cursor-pointer"
        >
          <FaSignOutAlt /> Thoát
        </li>
      </ul>
    </div>
  );
};