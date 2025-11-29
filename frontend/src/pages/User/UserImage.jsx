import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Title } from '../../components/Title/Title';
import { avatarList } from '../../data/avatars';

export const UserImage = ({ closeForm, setAvatar }) => {
  const tabs = ['hoạt hình', 'phim', 'diễn viên',];
  const [activeTab, setActiveTab] = useState('hoạt hình');
  const [urlAvatar, setUrlAvatar] = useState('');

  const handleSave = () => {
    if (urlAvatar) {
      setAvatar(urlAvatar);
    }
    closeForm();
  };

  return (
    <div className='fixed inset-0  flex justify-center items-center z-50'>
      <div className='bg-[#1e293b] text-white rounded-md p-6 lg:w-[40%] sm:w-[80%] w-[90%] 
                  max-h-[90vh] overflow-y-auto relative'>
        <button onClick={closeForm} className='absolute top-4 right-4 text-white cursor-pointer hover:text-amber-300'>
          <FaTimes size={20} />
        </button>
        <Title title='Đổi ảnh đại diện' className='justify-center flex my-4 text-lg font-semibold' />

        <div className='flex gap-4 mb-6 justify-center flex-wrap'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-full text-sm cursor-pointer 
            ${activeTab === tab ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className='grid lg:grid-cols-5 sm:grid-cols-5 grid-cols-3 gap-2'>
          {avatarList
            .filter((avatar) => avatar.category === activeTab)
            .map((avatar, index) => (
              <img
                onClick={() => setUrlAvatar(avatar.url)}
                key={index}
                src={avatar.url}
                alt={`avatar-${index}`}
                className={`w-full h-auto aspect-square object-cover rounded-md cursor-pointer 
                        hover:scale-105 transition-transform duration-200 border-2 border-transparent`}
              />
            ))}
        </div>

        <div className='space-x-4 flex justify-end mt-6'>
          <button onClick={handleSave} className='px-4 rounded-sm bg-amber-300 py-1 text-sm text-black cursor-pointer hover:opacity-85'>Lưu</button>
          <button onClick={closeForm} className='px-4 rounded-sm bg-white py-1 text-sm text-black cursor-pointer hover:opacity-85'>Đóng</button>
        </div>
      </div>
    </div>
  );
};
