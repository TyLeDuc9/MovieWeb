import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites, removeFavorite } from '../../redux/apiFavorite';
import { FaTimes } from 'react-icons/fa';

export const FavoriteCast = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser)
  const token = currentUser?.token
  const userId = currentUser?.user?._id || currentUser?.user?.id
  const { items, error } = useSelector((state) => state.favorite);
  useEffect(() => {
    if (token) {
      fetchFavorites(dispatch, token)
    }
  }, [dispatch, token])

  const handleRemove = (directorId) => {
    if (!token || !userId) {
      return alert('Vui lòng đăng nhập để sử dụng chức năng này');

    }
    removeFavorite({ id: directorId, type: 'director' }, dispatch, token);
  }
  const castFavorites = items?.filter(item => item.tmdbDirectorId);


  return (
    <div className='text-white px-4 py-2'>

      {error && <p className="text-red-500">{error}</p>}
      {castFavorites?.length === 0 && <p className='text-sm font-normal bg-[#34374d] text-center p-12 rounded-sm my-8'>Bạn chưa có diễn viên yêu thích nào</p>}
      <ul className="space-y-3">
        {castFavorites?.map((item) => (
          <li key={item._id} className="bg-[#1d1e2d]  p-3 rounded-md flex justify-between items-center duration-300 ease-in  text-sm lg:text-[16px]">
            <div className="flex items-center gap-3">
              <span>Director ID: {item.tmdbDirectorId}</span>
            </div>
            <button
              className="text-red-500 cursor-pointer hover:opacity-80"
              onClick={() => handleRemove(item.tmdbDirectorId)}>
              <FaTimes />
            </button>
          </li>
        ))}
      </ul>

    </div>

  );
};
