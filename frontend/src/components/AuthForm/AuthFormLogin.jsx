import React, { useState, useEffect } from 'react';
import LoginBanner from '../../assets/banner/LoginBanner.jpg';
import logo from '../../assets/logo/logo.svg';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/apiRequest';
import { useSelector } from 'react-redux';
import useTogglePassword from '../../hooks/useTogglePassword';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export const AuthFormLogin = ({ closeForm, handleSwitch, formType }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const { showPassword, togglePassword } = useTogglePassword();

    useEffect(() => {
        if (formType === 'login') {
            setEmail('');
            setPassword('');
        }
    }, [formType]);

    useEffect(() => {
        if (currentUser) {
            closeForm();
        }
    }, [currentUser]);

    const handleLogin = (e) => {
        e.preventDefault()
        const newUser = {
            email: email,
            password: password
        }
        loginUser(newUser, dispatch, setErrorMsg);


    }

    return (
        <div className=" lg:fixed inset-0 z-50 flex items-center justify-center mt-4 relative">
            <div className="lg:w-[900px] lg:h-[75vh] lg:relative lg:-top-6 lg:left-6
                md:w-[450px] md:h-[380px] md:top-40 md:left-36
                w-[310px] h-[300px]  flex  overflow-hidden shadow-2xl absolute top-36 left-7">

                <div
                    className="w-1/2 h-full bg-cover bg-center relative hidden lg:block"
                    style={{ backgroundImage: `url(${LoginBanner})` }}
                >
                    <div className="absolute bottom-6 left-6 text-white">
                        <img src={logo} className="w-36" alt="Logo" />
                    </div>
                </div>

                <div className="lg:w-1/2 bg-[#2e3148] text-white lg:p-16 p-6 relative">
                    <button
                        type='button'
                        onClick={closeForm}
                        className="absolute top-2 cursor-pointer right-2 text-white lg:text-lg text-sm hover:text-amber-300"
                    >
                        <FaTimes />
                    </button>

                    <h2 className=" font-bold text-lg pt-2 mb-2 lg:text-2xl lg:pt-8 lg:mb-4 md:text-2xl md:pt-8 md:mb-4">Đăng nhập</h2>
                    <p className="lg:text-sm md:text-sm text-gray-400 lg:mb-6 md:mb-6 mb-4 text-xs">
                        Nếu bạn chưa có tài khoản,
                        <button
                            type='button'
                            onClick={handleSwitch}
                            className="pl-2 text-yellow-200 cursor-pointer bg-transparent border-none "
                        >
                            đăng ký ngay
                        </button>
                    </p>

                    <form onSubmit={handleLogin}
                        className="lg:space-y-6 md:space-y-6 space-y-4">
                        <input
                            type="email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full lg:px-4 md:py-2 lg:py-2 p-2 bg-transparent border border-gray-600 rounded focus:border-white text-base"
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                className="w-full lg:px-4 md:py-2 lg:py-2 p-2 pr-10 bg-transparent border border-gray-600 rounded focus:border-white text-base"
                                required
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-amber-300"
                                onClick={togglePassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    
                        {errorMsg && (
                            <div className="text-red-500 text-sm">{errorMsg}</div>
                        )}
                        <button
                            type="submit"
                            className="w-full lg:text-[16px] md:text-sm bg-yellow-300 cursor-pointer text-whitefont-semibold 
                                lg:py-2 md:py-2 p-2 rounded hover:opacity-85 text-xs"
                        >
                            Đăng nhập
                        </button>
                    </form>

                    <div className="lg:mt-8 mt-4 text-center">
                        <a href="#" className="lg:text-sm text-xs text-gray-400 hover:text-amber-300">
                            Quên mật khẩu?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};