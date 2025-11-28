import React, { useEffect, useState } from 'react';
import { FaUser, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.svg';
import { GenreDropdown } from '../GenreDropdown/GenreDropdown';
import { ContriesDropdown } from '../GenreDropdown/ContriesDropdown';
import { UserDropdown } from '../GenreDropdown/UserDropdown';
import { AuthForm } from '../AuthForm/AuthForm';
import { Search } from '../Search/Search';
import { useSelector } from 'react-redux';
const navItems = [
  'Trang chủ',
  'Thể loại',
  'Phim lẻ',
  'Phim bộ',
  // 'Xem chung',
  'Quốc gia',
  'Diễn viên',
  // 'Lịch chiếu'
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showUser, setShowUser] = useState(false)

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const userId = currentUser?.user?.id || currentUser?._userid;

  const [avatar, setAvatar] = useState(
    localStorage.getItem(`avatar_user_${userId}`) ||
    'https://i.pinimg.com/1200x/14/dc/03/14dc031c7e4c67728100119f24208deb.jpg'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newAvatar = localStorage.getItem(`avatar_user_${userId}`);
      if (newAvatar && newAvatar !== avatar) {
        setAvatar(newAvatar);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [userId, avatar]);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handldeDropDownMenu = (e) => {
    e.preventDefault();
    setShowGenreDropdown(prev => !prev);
  };

  const handleDropCountries = (e) => {
    e.preventDefault();
    setShowCountriesDropdown(prev => !prev);
  };

  const showNavBar = (e) => {
    e.preventDefault()
    setShowMobileMenu(prev => !prev)
  }
  const handleUser = (e) => {
    e.preventDefault()
    setShowUser(prev => !prev)
  }



  return (
    <>
      <header
        className={`lg:grid lg:grid-cols-12 px-3 py-3 fixed top-0 right-0 w-full z-50 transition duration-300 bg-black
        ${isScrolled ? 'lg:bg-black shadow-md' : 'lg:bg-transparent'}`}
      >
        <div className='lg:col-span-4 lg:flex lg:items-center lg:gap-4 flex'>
          <div className="lg:hidden text-white pr-4 pt-0.5">
            <button onClick={showNavBar}>
              {
                showMobileMenu ? <FaTimes /> : <FaBars />
              }
            </button>
          </div>
          <Link to='/'>
            <div className='lg:w-32 w-20 mt-0.5 mr-4'>
              <img src={logo} alt='Logo' />
            </div>
          </Link>
          <Search />
        </div>

        <nav className='hidden lg:col-span-6 lg:flex lg:items-center lg:relative'>
          <ul className='flex gap-6 text-sm text-white font-semibold ml-8'>
            {navItems.map((item, index) => {
              if (item === 'Thể loại') {
                return (
                  <li key={index} className='relative'>
                    <a
                      href="#"
                      onClick={handldeDropDownMenu}
                      className='cursor-pointer flex items-center gap-1'
                    >
                      {item}
                      <FaChevronDown className="text-xs mt-0.5 font-bold" />
                    </a>
                    {showGenreDropdown && (
                      <div className='absolute left-0 top-full mt-2 bg-[#282b39]/90 p-6 rounded shadow-lg z-50 w-[500px]'>
                        <GenreDropdown closeDropdown={() => setShowGenreDropdown(false)} />
                      </div>
                    )}
                  </li>
                );
              }

              if (item === 'Quốc gia') {
                return (
                  <li key={index} className='relative'>
                    <a
                      href="#"
                      onClick={handleDropCountries}
                      className='cursor-pointer flex items-center gap-1'
                    >
                      {item}
                      <FaChevronDown className="text-xs mt-0.5 font-bold" />
                    </a>
                    {showCountriesDropdown && (
                      <div className='absolute left-0 top-full mt-2 bg-[#282b39]/90 p-6 rounded shadow-lg z-50 w-[500px]'>
                        <ContriesDropdown closeDropdown={() => setShowCountriesDropdown(false)} />
                      </div>
                    )}
                  </li>
                );
              }
              if (item === 'Phim lẻ') {
                return (
                  <li key={index} className='hover:text-amber-400'>
                    <Link to='/phim-le'>{item}</Link>
                  </li>
                );
              }
              if (item === 'Phim bộ') {
                return (
                  <li key={index} className='hover:text-amber-400'>
                    <Link to='/phim-bo'>{item}</Link>
                  </li>
                );
              }
              if (item === 'Diễn viên') {
                return (
                  <li key={index} className='hover:text-amber-400'>
                    <Link to='/dien-vien'>{item}</Link>
                  </li>
                );
              }
              if (item === 'Trang chủ') {
                return (
                  <li key={index} className='hover:text-amber-400'>
                    <Link to='/'>{item}</Link>
                  </li>
                )
              }
              return (
                <li key={index} className='hover:text-amber-400'>
                  <a href='#'>{item}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-evenly text-sm text-white'>
          <div className=''>
            <p>Tải ứng dụng</p>
            <p>RoPhim</p>
          </div>


          {
            currentUser ? (
              <div className='relative'>
                <img
                  onClick={handleUser}
                  src={avatar}
                  className='h-10 w-10 rounded-full object-cover shadow-md border-2 border-white mt-1 cursor-pointer'
                />
                <FaChevronDown onClick={handleUser} className="text-lg font-bold top-4 absolute cursor-pointer -right-6" />
                {showUser && <UserDropdown />}
              </div>
            ) : (

              <button
                onClick={() => setShowAuthForm(true)}
                className='hidden lg:flex lg:items-center cursor-pointer text-white bg-gray-800 lg:py-2.5 lg:px-3 rounded-2xl'>
                <FaUser />
                <span className='ml-2'>Thành viên</span>
              </button>
            )
          }

        </div>






        {/* MOBILE */}
        {showMobileMenu && (
          <div className="lg:hidden absolute top-full left-1 w-full max-w-xs bg-[#414f89] rounded-lg mt-1 shadow-md z-50">

            {currentUser ? (
              <div className='flex justify-center my-4'>
                <div className='relative'>
                  <img
                    onClick={handleUser}
                    src={avatar}
                    alt="Avatar"
                    className='h-10 w-10 rounded-full object-cover shadow-md border-2 border-white cursor-pointer'
                  />
                  <FaChevronDown
                    onClick={handleUser}
                    className="text-sm font-bold top-3 absolute cursor-pointer -right-6 text-white"
                  />
                  {showUser && <UserDropdown />}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthForm(true)}
                className='flex items-center justify-center gap-2 mx-auto py-2 px-4 bg-white w-[90%] my-4 rounded-3xl'>
                <FaUser />
                <span className='text-xs font-semibold pt-0.5'>Thành viên</span>
              </button>
            )}

            <nav className='text-white text-xs font-semibold mb-4'>
              <ul className='grid grid-cols-2 w-[90%] mx-auto gap-y-4 sm:gap-y-6'>
                {navItems.map((item, index) => {
                  if (item === 'Thể loại') {
                    return (
                      <li key={index} className='relative'>
                        <a
                          href="#"
                          onClick={handldeDropDownMenu}
                          className='cursor-pointer flex items-center gap-1'
                        >
                          {item}
                          <FaChevronDown className="text-xs mt-0.5 font-bold" />
                        </a>
                        {showGenreDropdown && (
                          <div className='lg:p-6 lg:bg-[#282b39]/90  lg:left-0 lg:top-full
                          bg-black/90 rounded shadow-lg z-50 lg:w-[500px] p-2 mt-2 absolute w-[350px] -left-36'>
                            <GenreDropdown closeDropdown={() => setShowGenreDropdown(false)} />
                          </div>
                        )}
                      </li>
                    );
                  }

                  if (item === 'Quốc gia') {
                    return (
                      <li key={index} className='relative'>
                        <a
                          href="#"
                          onClick={handleDropCountries}
                          className='cursor-pointer flex items-center gap-1'
                        >
                          {item}
                          <FaChevronDown className="text-xs mt-0.5 font-bold" />
                        </a>
                        {showCountriesDropdown && (
                          <div className='absolute w-[350px] p-2 bg-black/90 left-0 top-full rounded shadow-lg z-50 mt-2 
                          lg:bg-[#282b39]/90 lg:p-6 lg:w-[500px]'>
                            <ContriesDropdown closeDropdown={() => setShowCountriesDropdown(false)} />
                          </div>
                        )}
                      </li>
                    );
                  }
                  if (item === 'Phim lẻ') {
                    return (
                      <li key={index} className='hover:text-amber-400'>
                        <Link to='/phim-le'>{item}</Link>
                      </li>
                    );
                  }
                  if (item === 'Phim bộ') {
                    return (
                      <li key={index} className='hover:text-amber-400'>
                        <Link to='/phim-bo'>{item}</Link>
                      </li>
                    );
                  }
                  if (item === 'Diễn viên') {
                    return (
                      <li key={index} className='hover:text-amber-400'>
                        <Link to='/dien-vien'>{item}</Link>
                      </li>
                    );
                  }
                  return (
                    <li key={index} className='hover:text-amber-400'>
                      <a href='#'>{item}</a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

        )}

        {showAuthForm && (
          <AuthForm closeForm={() => setShowAuthForm(false)} />
        )}
      </header>

    </>
  );
};





