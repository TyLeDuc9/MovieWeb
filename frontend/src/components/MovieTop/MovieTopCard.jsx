import React from 'react'
import { useNavigate } from 'react-router-dom';
import { handleNavigateDetail } from "../../utils/handleNavigateDetail";
export const MovieTopCard = ({ movie, index }) => {
    const navigate = useNavigate()
    const title = movie.title || movie.name || 'No title';
    return ( 
        <div className='px-2 w-full'>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={title}
                onClick={() => {
                    handleNavigateDetail(navigate, movie)
                }}
                className='lg:cursor-pointer
          rounded-md shadow-2xl lg:hover:border-amber-500 lg:hover:border-[6px]
          lg:hover:scale-95 duration-500 ease-in-out aspect-[2/3] object-cover'
            />
            <div className='text-white flex'>
                <div className="lg:text-6xl text-4xl font-bold bg-gradient-to-t from-amber-300 to-amber-100
        italic text-transparent bg-clip-text lg:pr-2 md:pr-2 pr-1 pt-1">
                    {index + 1}
                </div>

                <div className='pt-2 px-4'>
                    <h3
                        onClick={() => handleNavigateDetail(navigate, movie)}
                        className='lg:text-sm md:text-sm text-xs line-clamp-1 hover:text-amber-400 cursor-pointer'>
                        {title}
                    </h3>
                    <p className='text-xs text-red-500 pt-1 cursor-pointer font-semibold'>
                        Rating: {movie.vote_average?.toFixed(1)}
                    </p>
                </div>
            </div>
        </div>
    )
}
