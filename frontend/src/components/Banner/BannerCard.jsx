import React from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { handleNavigateTrailer } from '../../utils/handleNavigateTrailer';
import { useNavigate } from 'react-router-dom';
export const BannerCard = ({ movie, isTransitioning }) => {
    const navigate = useNavigate()
    return (
        <section className={`lg:w-full lg:h-[90vh] md:h-[40vh] h-full relative overflow-hidden transition-all duration-500 ease-in-out
            ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}
        `}>
            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}

                alt={movie.title}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-700"
            />
            <div className="absolute lg:top-[30%] lg:left-9 top-36 left-2 md:top-60">
                <h1
                    onClick={() => handleNavigateTrailer(navigate, movie)}
                    className="text-red-500 hover:text-amber-300 cursor-pointer lg:text-4xl md:text-xl text-xs shadow-amber-600 font-bold break-words max-w-[300px]">
                    {movie.title || movie.name}
                </h1>
                <p className="text-white lg:text-lg md:text-sm lg:pt-1 font-semibold shadow-2xl text-[8px]">
                    {movie.original_title || movie.original_name}
                </p>
                <div className="flex items-center shadow-2xl lg:text-[10px] md:text-[9px] text-[8px] font-bold">
                    <p className="text-amber-400 border border-amber-500 w-fit lg:p-1 p-0.5 mt-2 rounded-lg">
                        IMDb
                        <span className="text-white lg:text-[12px] text-[8px]"> {movie.vote_average?.toFixed(1)}</span>
                    </p>
                    <p className="text-white border border-e-white w-fit lg:p-1 p-0.5 mt-2 mx-2 rounded-lg">
                        {movie.release_date}
                    </p>
                </div>
                <p className="hidden lg:text-white lg:max-w-[30%] lg:line-clamp-3 lg:pt-3">
                    {movie.overview}
                </p>
                <div className='bg-black w-fit rounded-full hidden lg:block md:block'>
                    <BsFillPlayCircleFill
                        onClick={() => handleNavigateTrailer(navigate, movie)}
                        className="text-yellow-200 lg:text-7xl lg:mt-8 lg:cursor-pointer  md:text-5xl md:mt-2"
                    />
                </div>

            </div>
        </section>
    );
};
