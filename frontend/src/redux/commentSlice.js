// redux/commentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    replies: {},
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCommentsSuccess: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    },
    fetchRepliesSuccess: (state, action) => {
      const { parentId, replies } = action.payload;
      state.replies[parentId] = replies;
      state.loading = false;
    },
    addCommentSuccess: (state, action) => {
      const newComment = action.payload;
      if (!newComment.parentCommentId) {
        state.comments.unshift(newComment);
      } else {
        if (!state.replies[newComment.parentCommentId]) {
          state.replies[newComment.parentCommentId] = [];
        }
        state.replies[newComment.parentCommentId].push(newComment);
      }
      state.loading = false;
    },
    deleteCommentSuccess: (state, action) => {
      const id = action.payload;
      state.comments = state.comments.filter(c => c._id !== id);
      for (const parent in state.replies) {
        state.replies[parent] = state.replies[parent].filter(c => c._id !== id);
      }
      state.loading = false;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
  },
});

export const {
  fetchStart, fetchCommentsSuccess, fetchRepliesSuccess,
  addCommentSuccess, deleteCommentSuccess, fetchFail,
} = commentSlice.actions;

export default commentSlice.reducer;
