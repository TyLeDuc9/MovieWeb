import axiosInstance from './axiosInstance';
import {
  fetchFavoriteStart,
  fetchFavoriteSuccess,
  addFavoriteSuccess,
  removeFavoriteSuccess,
  fetchFavoriteFailed
} from './favoriteSlice';


export const fetchFavorites = async (dispatch, token) => {
  dispatch(fetchFavoriteStart());
  try {
    const res = await axiosInstance.get('/favorite', {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchFavoriteSuccess(res.data));
  } catch (err) {
    dispatch(fetchFavoriteFailed('Lỗi khi lấy danh sách yêu thích'));
    console.error(err);
  }
};

export const addFavorite = async (movie, dispatch, token) => {
  dispatch(fetchFavoriteStart());
  try {
    const res = await axiosInstance.post('/favorite', movie, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(addFavoriteSuccess(res.data));
  } catch (err) {
    dispatch(fetchFavoriteFailed(
      err.response?.data?.message || 'Lỗi khi thêm vào yêu thích'
    ));
    console.error('❌ Lỗi khi thêm yêu thích:', err.response?.data || err.message);
  }
};

export const removeFavorite = async ({ id, type }, dispatch, token) => {
  dispatch(fetchFavoriteStart());

  const query = type === 'movie' ? `movieId=${id}` : `directorId=${id}`;

  try {
    await axiosInstance.delete(`/favorite?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(removeFavoriteSuccess({ type, id }));
  } catch (err) {
    dispatch(fetchFavoriteFailed('Lỗi khi xoá khỏi yêu thích'));
    console.error(err);
  }
};
