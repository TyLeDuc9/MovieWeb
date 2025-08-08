import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext'
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';
export const MovieDetailRecomment = () => {
  const navigate = useNavigate()
  const { id, type } = useParams()
  const { recomment, getRecomment } = useAppContext()

  useEffect(() => {
    getRecomment(id, type)
  }, [id, type])
  if (!recomment || recomment === 0) {
    return <p className='pt-2 text-white'>Không có phim đề xuất</p>;
  }
  return (
    <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4 py-4'>
      {
        recomment.slice(0, 15).map((movie) => (
          <div key={movie.id}>
            <img
              onClick={() => handleNavigateDetail(navigate, movie)}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
              className='rounded-lg object-cover cursor-pointer hover:opacity-85' />
            <div className='text-white text-center'>
              <h3
                onClick={() => handleNavigateDetail(navigate, movie)}
                className='lg:text-base md:text-sm text-xs  line-clamp-1 hover:text-amber-400 cursor-pointer pt-2'>{movie.title || movie.name}</h3>
              <p className='text-xs text-gray-400 pt-1 cursor-pointer line-clamp-1'>{movie.original_title || movie.original_name}</p>
            </div>
          </div>

        ))
      }
    </div>
  )
}
