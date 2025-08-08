import React from 'react';
import { FaVideo, FaBell, FaPlus, FaPaperPlane, FaCommentDots, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { handleNavigateTrailer } from '../../utils/handleNavigateTrailer';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/apiFavorite';

export const MovieDetailNotify = ({ movie, scrollToComment }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const token = currentUser?.token;
    const { items } = useSelector((state) => state.favorite);

    const isFavorite = items?.some((item) => item.tmdbMovieId === movie.id);

    const handleTabClick = async (name) => {
        if (name === 'Bình luận') {
            scrollToComment();
        } else if (name === 'Yêu thích' || name === 'Bỏ thích') {
            if (!token) return alert('Vui lòng đăng nhập để sử dụng chức năng này');

            if (isFavorite) {
                await removeFavorite({ id: movie.id, type: 'movie' }, dispatch, token);
            } else {
                const favoriteData = {
                    tmdbMovieId: movie.id,
                };
                await addFavorite(favoriteData, dispatch, token);
            }
        } else if (name === 'Chia sẻ') {
            alert('Chức năng chia sẻ đang phát triển');
        } else if (name === 'Thêm vào') {
            alert('Chức năng thêm đang phát triển');
        }
    };


    const tabs = [
        {
            id: 1,
            name: isFavorite ? 'Bỏ thích' : 'Yêu thích',
            icon: <FaHeart className={isFavorite ? 'text-amber-300' : ''} />,
        },
        { id: 2, name: 'Thêm vào', icon: <FaPlus /> },
        { id: 3, name: 'Chia sẻ', icon: <FaPaperPlane /> },
        { id: 4, name: 'Bình luận', icon: <FaCommentDots /> },
    ];

    return (
        <section>
            <div className='lg:px-16 md:px-20 lg:py-12 pl-10 py-4 flex'>
                <div className="text-black">
                    <div className="w-fit border border-amber-300 rounded-lg overflow-hidden shadow-md">
                        <button
                            onClick={() => handleNavigateTrailer(navigate, movie)}
                            className="flex items-center lg:gap-2 gap-1 bg-gradient-to-r text-xs lg:text-sm md:text-sm from-amber-300 
              to-amber-200 font-semibold lg:px-3 md:px-3 md:py-3 px-2 py-2 w-full cursor-pointer"
                        >
                            <FaVideo />
                            <span>Xem Trailer</span>
                        </button>
                        <span className="bg-white text-xs cursor-pointer block font-semibold text-center lg:px-4 py-1 w-full">
                            Phim sắp ra mắt
                        </span>
                    </div>
                </div>

                <ul className='flex lg:gap-6 gap-2 md:gap-8 items-center lg:ml-8 md:ml-8 ml-1 lg:text-sm md:text-sm text-[12px]'>
                    {tabs.map((tab) => (
                        <li
                            key={tab.id}
                            onClick={() => handleTabClick(tab.name)}
                            className='flex flex-col items-center cursor-pointer hover:bg-white/5 transition lg:p-2 md:p-2 p-0.5 rounded-lg'
                        >
                            {tab.icon}
                            <span className="mt-1">{tab.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
