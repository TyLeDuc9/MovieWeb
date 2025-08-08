import React, { useState } from 'react';
import { Title } from '../../components/Title/Title';
import { FavoriteMovie } from './FavoriteMovie';
import { FavoriteCast } from './FavoriteCast';

export const Favorite = () => {
  const [activeTab, setActiveTab] = useState('movie')
  const tabs = ['movie', 'cast']

  return (
    <div className='lg:pt-24 lg:pl-12'>
      <Title title="Yêu thích" className='lg:text-2xl sm:text-lg text-white font-semibold ml-6 lg:ml-0' />
      <div>
        {
          tabs.map((tab, index) => (
            <button key={index} type='button' onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-6 py-2 rounded-2xl lg:mr-2 mr-0 my-4 ml-6 lg:ml-0 text-sm duration-300 ease-in-out
              ${activeTab === tab ? 'text-[#282a21] bg-white' : 'text-white bg-[#282a39]'}`}>
              {tab === 'movie' && 'Phim'}
              {tab === 'cast' && 'Diễn viên'}
            </button>
          ))
        }
      </div>
      <div>
        {activeTab === 'movie' && <FavoriteMovie />}
        {activeTab === 'cast' && <FavoriteCast />}
      </div>
    </div>
  );
};
