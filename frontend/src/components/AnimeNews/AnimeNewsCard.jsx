import React from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { handleNavigateDetail } from "../../utils/handleNavigateDetail";
import { useNavigate } from 'react-router-dom';

export const AnimeNewsCard = ({ movie, isTransitioning }) => {
    const navigate = useNavigate();
    const title = movie.title || movie.name || 'No Title';
    const originalTitle = movie.original_title || movie.original_name || '';
    const releaseDate = movie.first_air_date || 'Unknown';
    const vote = movie.vote_average?.toFixed(1) || 'N/A';
    const overview = movie.overview || 'Chưa có thông tin';

    return (
            <section
                className={`relative overflow-hidden transition-all duration-500 ease-in-out
  ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}
  h-auto lg:h-[75vh]`}
            >
            <img
                onClick={() => handleNavigateDetail(navigate, movie)}
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={title}
                className="w-full h-[55vh] md:h-[30vh] md:rounded-none lg:h-full object-cover cursor-pointer transition-transform duration-700 rounded-2xl"
            />

            <div className="lg:hidden absolute inset-x-0 bottom-0 h-2/4 md:h-[35%]  bg-gradient-to-t from-blue-950/95 to-transparent 
  rounded-b-lg md:rounded-none z-10 md:bottom-0"
            />

            {/* Content */}
            <div className="absolute lg:top-[10%] lg:left-10 md:-bottom-0 left-5 bottom-5 z-20 text-white space-y-2 max-w-[90%] lg:max-w-[40%]">
                <h1
                    onClick={() => handleNavigateDetail(navigate, movie)}
                    className="text-xl lg:text-4xl cursor-pointer hover:text-amber-300 font-bold text-red-500 drop-shadow-md">
                    {title}
                </h1>
                <p className="text-sm lg:text-lg font-medium text-white/90">
                    {originalTitle}
                </p>

                <div className="flex flex-wrap items-center gap-2 lg:pt-2 pt-0.5">
                    <span className="bg-yellow-400 text-black text-[10px] lg:text-xs font-bold px-2 py-0.5 rounded-full">
                        IMDb <span className="text-white">{vote}</span>
                    </span>
                    <span className="bg-white text-black text-[10px] lg:text-xs font-bold px-2 py-0.5 rounded-full">
                        {releaseDate}
                    </span>
                </div>

                <p className="text-xs lg:text-sm text-white/90 lg:pt-2 pt-0.5 line-clamp-3 md:line-clamp-2">
                    {overview}
                </p>

                {/* Play Button - only on lg */}
                <div className='hidden lg:block mt-5'>
                    <BsFillPlayCircleFill
                        onClick={() => handleNavigateDetail(navigate, movie)}
                        className="text-amber-200 text-6xl hover:scale-110 transition-transform cursor-pointer drop-shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
};
