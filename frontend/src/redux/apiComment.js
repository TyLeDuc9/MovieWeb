// redux/apiRequest/commentApi.js
import axiosInstance from './axiosInstance';
import {
  fetchStart, fetchCommentsSuccess, fetchRepliesSuccess,
  addCommentSuccess, deleteCommentSuccess, fetchFail,
} from './commentSlice';

export const fetchCommentsByMovie = async (movieId, dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await axiosInstance.get(`/comments/movie/${movieId}`);
    dispatch(fetchCommentsSuccess(res.data));
  } catch (err) {
    dispatch(fetchFail("Lỗi khi lấy comment"));
    console.log(err);
  }
};

export const fetchReplies = async (parentId, dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await axiosInstance.get(`/comments/replies/${parentId}`);
    dispatch(fetchRepliesSuccess({ parentId, replies: res.data }));
  } catch (err) {
    dispatch(fetchFail("Lỗi khi lấy reply"));
    console.log(err);
  }
};

export const createComment = async (data, dispatch, token) => {
  dispatch(fetchStart());
  try {
    const res = await axiosInstance.post('/comments', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addCommentSuccess(res.data));
  } catch (err) {
    dispatch(fetchFail("Lỗi khi tạo comment"));
    console.log(err);
  }
};

export const deleteComment = async (id, dispatch, token) => {
  dispatch(fetchStart());
  try {
    await axiosInstance.delete(`/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteCommentSuccess(id));
  } catch (err) {
    dispatch(fetchFail("Lỗi khi xoá comment"));
    console.log(err);
  }
};
