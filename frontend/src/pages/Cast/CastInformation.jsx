import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/apiFavorite';

export const CastInformation = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { castInfo, getCastInfo } = useAppContext();
  const [showBio, setShowBio] = useState(false);

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const token = currentUser?.token;

  const { items } = useSelector((state) => state.favorite); 
  const isFavorite = items?.some((item) => item.tmdbDirectorId === castInfo?.id);

  const handleTabClick = async () => {
    if (!token) return alert('Vui lòng đăng nhập để sử dụng chức năng này');

    if (isFavorite) {
      await removeFavorite({ id: castInfo.id, type: 'director' }, dispatch, token);
    } else {
      const favoriteData = {
        tmdbDirectorId: castInfo.id,
        type: 'director',
      };
      await addFavorite(favoriteData, dispatch, token);
    }
  };

  useEffect(() => {
    if (id) {
      getCastInfo(id);
    }
  }, [id]);

  if (!castInfo) {
    return <p className="pt-2 text-white">Đang tải thông tin...</p>;
  }

  const biography = castInfo.biography || 'Đang cập nhật';
  const birthday = castInfo.birthday || 'Đang cập nhật';

  return (
    <div className="text-white px-4 lg:col-span-3 w-[95%] lg:mx-auto pt-24">
      <div className="flex lg:justify-start justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w185${castInfo.profile_path}`}
          alt={castInfo.name}
          className="rounded-2xl mb-4 lg:w-40 lg:h-50 w-30 h-40 hover:opacity-75"
        />
      </div>
      <h2 className="text-white flex lg:justify-start justify-center lg:text-xl md:text-lg text-sm font-bold">
        {castInfo.name}
      </h2>
      <div className="flex items-center lg:justify-start justify-center gap-4 mt-4 text-white text-sm">
        <button
          onClick={handleTabClick}
          className={`flex items-center text-xs lg:text-sm md:text-sm gap-1 shadow-2xl py-1 px-2 rounded-2xl cursor-pointer 
            ${isFavorite ? 'bg-red-500' : 'bg-red-400'}`}
        >
          <FaHeart />
          <span>{isFavorite ? 'Đã thích' : 'Yêu thích'}</span>
        </button>
        <button className="flex items-center text-xs lg:text-sm md:text-sm gap-1 shadow-2xl bg-red-400 py-1 px-2 rounded-2xl cursor-pointer">
          <FaShareAlt />
          <span>Chia sẻ</span>
        </button>
      </div>

      <div className="pt-4">
        <span className="text-white lg:text-base md:text-lg text-sm font-semibold">Giới thiệu:</span>
        <p
          className={`text-white transition-all lg:text-sm md:text-sm text-xs duration-300 ${
            showBio ? '' : 'lg:line-clamp-4 line-clamp-2'
          }`}
        >
          {biography}
        </p>
        {biography && (
          <button
            onClick={() => setShowBio(!showBio)}
            className="text-amber-200 hover:underline lg:text-sm md:text-sm text-xs cursor-pointer"
          >
            {showBio ? 'Ẩn bớt' : 'Xem thêm'}
          </button>
        )}
      </div>

      <p className="text-white py-2 lg:text-base md:text-base text-xs font-semibold">
        Ngày sinh:
        <span className="text-gray-400 lg:text-[14px] text-xs"> {birthday}</span>
      </p>
    </div>
  );
};
