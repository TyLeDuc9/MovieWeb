import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { handleNavigateDetail } from '../../utils/handleNavigateDetail'
import { Link } from 'react-router-dom'
export const TrailerInformation = () => {
    const { id, type } = useParams()
    const { movieDetail, getMovieDetail } = useAppContext()
    const navigate = useNavigate()
    useEffect(() => {
        getMovieDetail(id, type);
    }, [id, type]);

    if (!movieDetail) {
        return <div className="text-white p-4">Đang tải thông tin phim...</div>;
    }
 


    const title = movieDetail.title || movieDetail.name || 'Không có tiêu đề';



    return (
        <section className="lg:flex text-white gap-6 lg:my-12 my-6">
            <div className="">
                <img
                    src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
                    alt={title}
                    className="lg:w-[140px] w-[150px] lg:h-[210px] object-cover rounded-lg shadow-md"
                />
            </div>
            <div className="flex flex-col">
                <div>
                    <h1 className="lg:text-2xl text-lg font-bold">{title}</h1>
                    {movieDetail.original_title && (
                        <p className="text-gray-400 lg:text-sm text-xs italic">{movieDetail.original_title}</p>
                    )}

                    <div className="flex gap-2 text-xs mt-2 border border-amber-300 w-fit rounded-lg">
                        <span className=" p-1 rounded-lg font-semibold text-amber-300">
                            IMDb {movieDetail.vote_average?.toFixed(1)}
                        </span>

                    </div>
                    <div className="flex gap-2 my-3 text-xs flex-wrap">
                        {movieDetail.genres?.map((genre) => (
                            <Link
                                key={genre.id}
                                to={`/the-loai/${genre.id}`}
                                className="bg-[#2c2f37] px-2 py-1 rounded-full hover:bg-[#3b3e48] transition text-white"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>

                </div>

            </div>
            <div className="max-w-md lg:text-sm text-xs text-gray-300 leading-relaxed">
                <p className='lg:line-clamp-4 line-clamp-2'>{movieDetail.overview}</p>
                <button
                    onClick={() => handleNavigateDetail(navigate, movieDetail)}
                    className="text-amber-400 hover:text-amber-300 cursor-pointer mt-2 block "
                >
                    Thông tin phim &rarr;
                </button>
            </div>

        </section>




    )
}
