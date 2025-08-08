import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { handleNavigateDetail } from '../../utils/handleNavigateDetail'
import { useLoading } from '../../context/LoadingContext';
import { ComponentLoading } from '../../components/GlobalLoading/ComponentLoading';
export const CastCredits = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { setComponentsLoading, componentsLoading } = useLoading();
  const { castCredits, getCastCredits } = useAppContext()

  useEffect(() => {
    const fetchCastCredits = async () => {
      try {
        setComponentsLoading(true);
        await getCastCredits(id);
      } catch (err) {
        console.log(err);
      } finally {
        setComponentsLoading(false);
      }
    };

    fetchCastCredits();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (componentsLoading) return <ComponentLoading />






  if (!castCredits) {
    return <p className='text-white pt-[10%]'>Không có thông tin</p>
  }
  return (
    <div className='lg:col-span-9 md:grid-cols-4 w-[95%] mx-auto lg:pt-24 pt-12 '>
      <div className='lg:border-l lg:border-b lg:border-l-cyan-50 lg:border-b-amber-50 lg:rounded-sm'>
        <h2 className='text-white lg:p-4 pb-2  font-semibold lg:text-2xl md:text-lg text-sm'>Các phim đã tham gia</h2>
        <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:p-4 gap-4 '>
          {
            castCredits.map((cast) => (
              <div key={`${cast.id}-${cast.credit_id}`}>
                <img
                  onClick={() => handleNavigateDetail(navigate, cast)}
                  src={`https://image.tmdb.org/t/p/w500${cast.poster_path || cast.backdrop_path}`}
                  alt={cast.title || cast.name}
                  className='rounded-lg object-cover cursor-pointer hover:opacity-85 lg:h-[300px] h-[250px] w-full'
                />
              
                <div className='text-white text-center'>
                  <h3
                    onClick={() => handleNavigateDetail(navigate, cast)}
                    className='lg:text-sm md:text-sm text-xs line-clamp-1 hover:text-amber-400 cursor-pointer pt-2'
                  >
                    {cast.title || cast.name}
                  </h3>
                  <p className='text-xs text-gray-400 pt-1 cursor-pointer line-clamp-1'>
                    {cast.original_title || cast.original_name}
                  </p>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}
