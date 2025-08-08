import React from 'react'
import { Title } from '../../components/Title/Title'
import { useAppContext } from '../../context/AppContext'
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';
import { useNavigate } from 'react-router-dom';
export const MovieDetailTop = ({ type }) => {
    const context = useAppContext();
    const movies = context[type]
    const navigate = useNavigate()
    return (
        <div className=''>
            <Title title='Top phim tuần này' className='text-white font-bold text-2xl py-4' />
            <div>
                {
                    movies.slice(0, 10).map((movie, index) => (
                        <div key={movie.id} className='flex my-2 rounded-lg shadow-lg'>
                            <div className="w-8 flex items-center justify-center mr-12">
                                <div className="text-6xl font-bold custom-stroke">
                                    {index + 1}
                                </div>
                            </div>
                            <div className='flex bg-[#1e1f28] w-full'>
                                <img
                                    onClick={() => handleNavigateDetail(navigate, movie)}
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
                                    className='w-[80px] h-[120px] object-cover rounded-l-lg cursor-pointer hover:opacity-75' />

                                <div className='text-white flex flex-col justify-center px-4'>
                                    <h3
                                        onClick={() => handleNavigateDetail(navigate, movie)}
                                        className='text-sm line-clamp-1 hover:text-amber-400 cursor-pointer text-white'>{movie.title || movie.name}</h3>
                                    <p className='text-xs text-gray-200 cursor-pointer line-clamp-2 py-2'>{movie.original_title || movie.original_name}</p>
                                    <span className="text-xs text-gray-500 font-semibold">
                                        {movie.release_date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>




        </div>
    )
}
