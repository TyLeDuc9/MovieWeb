import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';
export const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => handleNavigateDetail(navigate, movie)}
      className=" rounded-xl overflow-hidden cursor-pointer lg:pt-4">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || 'No images'}`}
        alt={movie.title}
        className="lg:w-full lg:h-[200px] w-[100%] object-cover rounded-xl px-2"
        loading="lazy"
      />
      <div className="p-2 text-white">
        <h3 className="lg:text-sm text-[10px] font-semibold lg:hover:text-amber-300 line-clamp-1 ">{movie.name || movie.title}</h3>
        <p className="lg:text-xs text-[8px] text-gray-400 lg:py-2">{movie.original_name || movie.original_title}</p>
      </div>
    </div>
  );
};
