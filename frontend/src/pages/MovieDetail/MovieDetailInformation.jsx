import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toSlug } from '../../utils/toSlugGenre';
import { MovieDetailActorTwo } from './MovieDetailActorTwo';
import { MovieDetailTop } from './MovieDetailTop';
import { Divider } from '../../components/Divider/Divider';
export const MovieDetailInformation = ({ movie }) => {
  const [showInfo, setShowInfo] = useState(false);

  if (!movie) {
    return <div className="text-white p-4">Đang tải thông tin phim...</div>;
  }

  const title = movie.title || movie.name || 'Không có tiêu đề';
  const times = movie.runtime
    ? `${movie.runtime} phút`
    : `${movie.episode_run_time || 'Chưa có thông tin'} tập`;

  const productionText = movie?.production_companies?.length
    ? movie.production_companies.slice(0, 5).map((p) => p.name).join(', ')
    : 'Chưa có thông tin';

  return (
    <section className=" lg:col-span-4 
    bg-gradient-to-b from-[#1e1e25] to-[#14161d] px-6 lg:px-12 py-6 text-white rounded-4xl flex flex-col items-center lg:items-start">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={title}
        className="w-[130px] md:w-[150px] h-auto shadow-2xl rounded-lg mb-4"
      />

      <div className="text-center lg:text-left">
        <h1 className="lg:text-2xl text-xl font-semibold py-2">{title}</h1>
        <span className="text-amber-500 font-semibold w-fit text-[15px]">
          {movie.original_title}
        </span>

        <div className="flex flex-wrap items-center text-[10px] font-bold gap-2 mt-2">
          <span className="text-amber-400 border border-amber-500 p-1 rounded-lg">
            IMDb:
            <span className="text-white text-[10px] ml-1">
              {movie.vote_average?.toFixed(1)}
            </span>
          </span>
          <span className="text-white border border-white p-1 rounded-lg">
            {movie.release_date}
          </span>
        </div>

        <div className="text-[10px] font-semibold py-4 flex flex-wrap gap-2">
          {movie.genres?.length > 0 ? (
            movie.genres.slice(0, 10).map((genre, index) => (
              <Link
                to={`/the-loai/${toSlug(genre.name)}/${genre.id}`}
                key={index}
                className="text-white bg-[#191b24] font-bold px-2 py-1.5 rounded-lg"
              >
                {genre.name}
              </Link>
            ))
          ) : (
            <span className="text-white">Chưa có thông tin</span>
          )}
        </div>

        <div className="text-[14px] leading-6 text-gray-300">
          {movie.overview && (
            <>
              <strong className="text-white lg:text-sm md:text-sm text-xs">Giới thiệu:</strong>
              <p className={`${showInfo ? '' : 'line-clamp-3'} text-xs md:text-sm lg:text-sm mt-1`}>
                {movie.overview}
              </p>
              <button
                className="cursor-pointer text-amber-200 mt-1 lg:text-sm md:text-sm text-xs"
                onClick={() => setShowInfo(!showInfo)}
              >
                {showInfo ? 'Ẩn bớt' : 'Xem thêm'}
              </button>
            </>
          )}
        </div>

        <p className="lg:text-sm md:text-sm text-xs text-white pt-4 font-bold">
          Thời lượng:
          <span className="font-semibold text-xs md:text-sm lg:text-sm text-gray-300 ml-1"> {times}</span>
        </p>

        <p className="lg:text-sm md:text-sm text-xs text-white pt-2 font-bold">
          Quốc gia:
          <span className="font-semibold text-gray-300 ml-1 text-xs md:text-sm lg:text-sm">
            {movie.origin_country?.join(', ') || 'Chưa có thông tin'}
          </span>
        </p>

        <p className="lg:text-sm md:text-sm text-xs text-white pt-2 font-bold">
          Sản xuất:
          <span className="font-semibold text-gray-300 ml-1 text-xs md:text-sm lg:text-sm">{productionText}</span>
        </p>
      </div>

      <div className=' py-12 hidden lg:block'>
        <Divider className='border-red-500 border-2 w-[100%] my-8' />
        <MovieDetailActorTwo />
        <Divider className='border-red-500 border-2 w-[100%] my-8' />
        <MovieDetailTop type="newMovies" />
      </div>
    </section>
  );
};
