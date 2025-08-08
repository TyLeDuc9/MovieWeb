import React from 'react'
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';
import { useNavigate } from 'react-router-dom'
export const CarouselMovieCard = ({ movie }) => {
  const navigate = useNavigate()
  return (
    <div
      className='px-2 group transition-transform duration-300 hover:scale-95'
      onClick={() => handleNavigateDetail(navigate, movie)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
        alt={movie.title}
        className='w-full lg:h-[300px] h-[170px] md:h-[280px] object-cover rounded-lg cursor-pointer shadow-lg 
        group-hover:brightness-75 transition-all duration-300'
      />
      <div className='text-white text-center'>
        <h3 className='lg:text-sm md:text-sm text-xs font-semibold pt-2 cursor-pointer line-clamp-1 group-hover:text-amber-400 transition'>
          {movie.title || movie.name}
        </h3>
        <p className='lg:text-xs text-[10px] text-gray-400 line-clamp-1 mt-2'>
          {movie.original_title || movie.original_name}
        </p>
      </div>
    </div>
  )
}
