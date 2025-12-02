import React, { useEffect, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';
export const Search = () => {
    const { searchMovies, getSearchMovies } = useAppContext();
    const [queryMovies, setQueryMovies] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (queryMovies.trim() !== '') {
                getSearchMovies(queryMovies)
            }
        }, 300)
        return () => clearTimeout(timeOut)
    }, [queryMovies])
    const handleSearch = () => {
        if (queryMovies.trim() !== '') {
            navigate(`/tim-kiem?q=${encodeURIComponent(queryMovies.trim())}`);
            setQueryMovies('');
        }
    };

    return (
        <div className="relative">
            <div className='
            flex items-center text-white border border-white/40 transition duration-300 px-2 py-1.5 text-xs
            lg:py-1.5 rounded-sm lg:px-2 lg:text-base'>
                <FaSearch onClick={handleSearch} className='text-white lg:text-lg base' />

                <input
                    onChange={(e) => setQueryMovies(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                    value={queryMovies}
                    type='text'
                    placeholder='Tìm kiếm phim, diễn viên'
                    className='outline-none bg-transparent text-base font-semibold 
                    lg:pl-4 lg:pr-10 lg:w-full w-[200px] md:w-[580px]                    '

                />

                {queryMovies && (
                    <FaTimes
                        onClick={() => setQueryMovies('')}
                        className='absolute right-1 text-white hover:text-amber-400 cursor-pointer'
                    />
                )}
            </div>
            {queryMovies && searchMovies.length > 0 && (
                <div className='absolute z-50 bg-[#1e1f28] p-4 w-full rounded shadow-lg'>
                    {searchMovies.slice(0, 5).map((item) => (
                        <div
                            key={item.id}
                            className='flex my-2 rounded-lg hover:bg-gray-800 cursor-pointer'
                            onClick={() => {
                                item.media_type === 'person'
                                    ? navigate(`/cast/${item.id}`)
                                    : handleNavigateDetail(navigate, item);
                                setQueryMovies('');
                            }}
                        >
                            {item.media_type === 'person' ? (
                                <>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w185${item.profile_path}`}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-full shadow-md"
                                    />
                                    <div className='text-white flex flex-col justify-center px-4'>
                                        <h3 className='text-sm hover:text-amber-400'>{item.name}</h3>
                                        <span className="text-xs text-gray-400">Diễn viên</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`}
                                        className='w-[60px] h-[80px] object-cover rounded-lg'
                                    />
                                    <div className='text-white flex flex-col justify-center px-4'>
                                        <h3 className='text-sm line-clamp-1 hover:text-amber-400'>
                                            {item.title || item.name}
                                        </h3>
                                        <p className='text-xs text-gray-200 line-clamp-2 py-1'>
                                            {item.original_title || item.original_name}
                                        </p>
                                        <span className="text-xs text-gray-500 font-semibold">
                                            {item.release_date}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                    ))}

                </div>
            )}
        </div>
    );
};

