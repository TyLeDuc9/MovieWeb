import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/apiRequest';
import { Title } from '../../components/Title/Title';
import { UserImage } from './UserImage';
import { AuthFormChangePass } from '../../components/AuthForm/AuthFormChangePass';

export const UserProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const token = currentUser?.token;
  const userId = currentUser?.user?.id || currentUser?.user?._id;

  const [showUserImage, setShowUserImage] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false)

  const [name, setName] = useState(currentUser?.user?.name || '');
  const [gender, setGender] = useState(currentUser?.user?.gender || 'unknown');
  const [message, setMessage] = useState('');




  const [avatar, setAvatar] = useState(() => {
    const storedAvatar = localStorage.getItem(`avatar_user_${userId}`);
    return (
      storedAvatar ||
      'https://i.pinimg.com/1200x/14/dc/03/14dc031c7e4c67728100119f24208deb.jpg'
    );
  });

  useEffect(() => {
    if (userId && avatar) {
      localStorage.setItem(`avatar_user_${userId}`, avatar);
    }
  }, [avatar, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      gender,
    };
    updateUser(userId, dispatch, token, userData, setMessage);
  };

  return (
    <section className='flex flex-col lg:flex-row sm:flex-row'>
      <div className='flex flex-col pt-24 pl-12'>
        <Title title='Tài khoản' className='text-white text-lg font-semibold' />
        <p className='text-gray-400 text-sm py-2'>Cập nhật thông tin tài khoản</p>
        {message && <p className='text-green-400 text-sm pb-2'>{message}</p>}

        <form className="space-y-4 flex flex-col mt-6" onSubmit={handleSubmit}>
          <label className='text-gray-400 text-xs mb-1'>Email</label>
          <input
            type="email"
            value={currentUser?.user?.email}
            className="p-2 bg-transparent cursor-not-allowed text-base text-gray-400 rounded lg:w-[400px] sm:w-[400px] w-[300px] focus:outline-none"
            readOnly
          />

          <label className='text-gray-400 text-xs mb-1'>Tên hiển thị</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 bg-transparent text-gray-400 rounded text-base lg:w-[400px] sm:w-[400px] w-[300px] "
          />

          <label className='text-gray-400 text-xs mb-1'>Giới tính</label>
          <div className="flex gap-4 text-white lg:text-base text-sm mb-6">
            <label><input type="radio" name="gender" value="male" checked={gender === 'male'}
              onChange={() => setGender('male')} /> Nam</label>
            <label><input type="radio" name="gender" value="female" checked={gender === 'female'}
              onChange={() => setGender('female')} /> Nữ</label>
            <label><input type="radio" name="gender" value="unknown" checked={gender === 'unknown'}
              onChange={() => setGender('unknown')} /> Không xác định</label>
          </div>

          <button type="submit"
            className='bg-amber-200 cursor-pointer px-5 py-2 rounded-sm w-fit text-sm font-medium text-black hover:opacity-85'>
            Cập nhật
          </button>
          <p className='text-gray-500 text-sm my-8'>Đổi mật khẩu, nhấn vào
            <span onClick={() => setShowChangePass(true)} className='text-amber-300 cursor-pointer'> đây</span>
          </p>
        </form>
      </div>
      <div className='flex flex-col items-center justify-center mt-2 lg:mt-52 lg:mx-24 sm:mx-2 mx-0'>
        <img
          onClick={() => setShowUserImage(true)}
          src={avatar}
          className='lg:w-36 lg:h-36 sm:h-28 sm:w-28 h-24 w-24 rounded-full object-cover
          shadow-md border-2 border-white cursor-pointer 
          transition-transform hover:scale-105 duration-200'
        />
        <p
          onClick={() => setShowUserImage(true)}
          className='text-white text-sm mt-2 cursor-pointer hover:text-blue-300'>
          Đổi ảnh đại diện
        </p>
      </div>

      {showUserImage && <UserImage closeForm={() => setShowUserImage(false)} setAvatar={setAvatar} />}
      {showChangePass && <AuthFormChangePass closeForm={() => setShowChangePass(false)} />}
    </section>
  );
};
