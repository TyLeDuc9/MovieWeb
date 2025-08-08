import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';

export const MovieItemThreeCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative px-2 w-full"
      onClick={() => handleNavigateDetail(navigate, movie)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.name}
        className="rounded-2xl w-full h-auto object-cover cursor-pointer"
      />

      {/* Poster nhỏ - chỉ hiện trên PC */}
      <div className="absolute bottom-4 left-4 w-20 h-auto shadow-lg rounded-md overflow-hidden hidden lg:block">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto cursor-pointer"
        />
      </div>

      {/* Text hiện đè trên ảnh - PC */}
      <div className="absolute lg:bottom-4 lg:left-28 text-white hidden lg:block">
        <h3 className="text-sm font-semibold line-clamp-1 hover:text-amber-400 cursor-pointer">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-300">{movie.original_title}</p>
        <p className="text-sm font-bold text-white">{movie.release_date}</p>
      </div>

      {/* Text hiện dưới ảnh - mobile */}
      <div className="mt-2 lg:hidden text-white text-left">
        <h3 className="text-sm font-semibold line-clamp-1 hover:text-amber-400 cursor-pointer">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-300 py-2">{movie.original_title}</p>
        <p className="text-xs font-bold text-white">{movie.release_date}</p>
      </div>
    </div>
  );
};
