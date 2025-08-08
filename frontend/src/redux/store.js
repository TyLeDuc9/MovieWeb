import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import commentReducer from './commentSlice';
import favoriteReducer from './favoriteSlice'
import userTabReducer from './userTabSlice';
const persistedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;
  


export default configureStore({
  reducer: {
    auth: authReducer,
    comment: commentReducer,
    favorite:favoriteReducer,
    userTab:userTabReducer,
   
  },
  preloadedState: {
    auth: {
      login: {
        currentUser: persistedUser,
        isFetching: false,
        error: false
      },
      register: {
        success: false,
        isFetching: false,
        error: false
      }
    }
  }
});
