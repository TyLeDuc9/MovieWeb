import React from 'react';

export const BannerDetail = ({ movie }) => {
  return (
    <div className="w-full lg:h-[650px] h-[350px] overflow-hidden flex items-center justify-center bg-gray-800 rounded-xl text-white text-xl">
      {movie?.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || 'Không có tiêu đề'}
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <p className="text-center">Không có ảnh nền cho phim này.</p>
      )}
    </div>
  );
};
