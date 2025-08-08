import axiosInstance from './axiosInstance';
import {
  loginFailed, loginStart, loginSuccess,
  registerFailed, registerStart, registerSuccess,
  updateUserStart, updateUserSuccess, updateFailed
} from './authSlice';

export const loginUser = async (user, dispatch, setErrorMsg) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    localStorage.setItem('user', JSON.stringify(res.data));
    setErrorMsg && setErrorMsg('');
  } catch (err) {
    dispatch(loginFailed());
    const message = err.response?.data?.message || "Email hoặc mật khẩu không chính xác!";
    setErrorMsg && setErrorMsg(message);
    console.error("Login error:", err.response?.data || err.message);
  }
};

export const registerUser = async (user, dispatch, setErrorMsg) => {
  dispatch(registerStart());
  try {
    await axiosInstance.post('/auth/register', user);
    dispatch(registerSuccess());
    setErrorMsg && setErrorMsg('');
  } catch (err) {
    dispatch(registerFailed());
    const message = err.response?.data?.message || 'Email hoặc mật khẩu không hợp lệ';
    setErrorMsg && setErrorMsg(message);
    console.error("Register error:", err);
  }
};

export const updateUser = async (userId, dispatch, token, userData, setMessage) => {
  dispatch(updateUserStart());
  try {
    const res = await axiosInstance.put(`/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedUser = res.data.user;
    dispatch(updateUserSuccess(updatedUser));

    const prev = JSON.parse(localStorage.getItem('user'));
    const newUserData = {
      ...prev,
      user: updatedUser,
    };
    localStorage.setItem('user', JSON.stringify(newUserData));
    setMessage && setMessage("Cập nhật thành công!");
  } catch (err) {
    dispatch(updateFailed());
    const message = err.response?.data?.message || "Cập nhật thất bại!";
    setMessage && setMessage(message);
    console.error("Update error:", err.response?.data || err.message);
  }
};

export const changePassword = async (userId, token, data, setMessage) => {
  try {
    const res = await axiosInstance.put(`/users/${userId}/change-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage(res.data.message || "Đổi mật khẩu thành công");
  } catch (err) {
    const msg = err.response?.data?.message || "Lỗi khi đổi mật khẩu";
    setMessage(msg);
  }
};
