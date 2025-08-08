import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { changePassword } from '../../redux/apiRequest';
import useTogglePassword from '../../hooks/useTogglePassword';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export const AuthFormChangePass = ({ closeForm }) => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const token = currentUser?.token;
    const userId = currentUser?.user?._id || currentUser?.user?.id;
    const { showPassword, togglePassword } = useTogglePassword();
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (message === 'Đổi mật khẩu thành công') {
            const timer = setTimeout(() => {
                closeForm()
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [message])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPass !== confirmPass) {
            setMessage('Mật khẩu xác nhận không khớp');
            return;
        }
        if (newPass.length < 6) {
            setMessage('Mật khẩu phải ít nhất 6 kí tự');
            return;
        }

        await changePassword(userId, token, {
            oldPassword: oldPass,
            newPassword: newPass,
            confirmPassword: confirmPass,
        }, setMessage);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50  mb-0 lg:mb-0 sm:mb-48">
            <div className="rounded-lg p-6 w-[90%] lg:w-[30%] sm:w-[50%] relative bg-[#2e3148]">
                <button onClick={closeForm} className="absolute top-2 right-2 cursor-pointer text-white hover:text-amber-300">
                    <FaTimes />
                </button>
                <h2 className="text-lg font-semibold mb-4 text-white text-center">Đổi mật khẩu</h2>
                {message && <p className="text-yellow-300 text-sm text-center mb-2">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Mật khẩu cũ</label>
                        <input
                            type="password"
                            value={oldPass}
                            onChange={(e) => setOldPass(e.target.value)}
                            className="w-full text-white p-2 bg-transparent border border-gray-600 rounded focus:border-white text-sm"
                        />
                    </div>
                    <div className='relative'>
                        <label className="block text-gray-400 text-sm mb-1">Mật khẩu mới</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            className="w-full text-white p-2 bg-transparent border border-gray-600 rounded focus:border-white text-sm"
                        />
                        <span
                            className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-amber-300"
                            onClick={togglePassword}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className='relative'>
                        <label className="block text-gray-400 text-sm mb-1">Nhập lại mật khẩu mới</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="w-full text-white p-2 bg-transparent border border-gray-600 rounded focus:border-white text-sm"
                        />
                        <span
                            className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-amber-300"
                            onClick={togglePassword}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="flex justify-center mt-8 font-medium text-xs">
                        <button type="submit" className="bg-amber-400 px-4 py-2 rounded hover:opacity-90">
                            Đổi mật khẩu
                        </button>
                        <button onClick={closeForm} type="button" className="bg-white px-4 py-2 ml-2 rounded hover:opacity-90 text-black">
                            Đóng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
