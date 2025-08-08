import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';
import { Title } from '../../components/Title/Title'
export const TrailerRecomment = () => {
  const { id, type } = useParams()
  const navigate = useNavigate()
  const { recomment, getRecomment } = useAppContext()
  useEffect(() => {
    getRecomment(id, type)
    window.scrollTo({top:0, behavior:'smooth' })
  }, [id, type])
  if (!recomment || recomment === 0) {
    return <p className='pt-2 text-white'>Không có phim đề xuất</p>;
  }
  return (
    <div className='m-2'>
      <Title title='Đề xuất cho bạn' className='text-white font-bold lg:text-2xl md:text-lg text-sm ' />
      <div className=';g:p-4 py-4'>
        {
          recomment.slice(0, 5).map((movie) => (
            <div key={movie.id} className='bg-[#1e1f28] flex my-2 rounded-lg shadow-lg'>
              <img
                onClick={() => handleNavigateDetail(navigate, movie)}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
                className='w-[80px] h-[120px] object-cover rounded-l-lg cursor-pointer hover:opacity-75' />

              <div className='text-white flex flex-col justify-center px-4'>
                <h3
                  onClick={() => handleNavigateDetail(navigate, movie)}
                  className='text-sm line-clamp-1 hover:text-amber-400 cursor-pointer text-white'>{movie.title || movie.name}</h3>
                <p className='text-xs text-gray-200 cursor-pointer line-clamp-2 py-2'>{movie.original_title || movie.original_name}</p>
                <span className="text-xs text-gray-500 font-semibold">
                  {movie.release_date}
                </span>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}
