import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { Title } from '../../components/Title/Title'
export const TrailerCast = () => {
    const { id, type } = useParams()
    const navigate = useNavigate()
    const { cast, getCast } = useAppContext()
    useEffect(() => {
        getCast(id, type)
    }, [id, type])
    if (!cast || cast.length === 0) {
        return <p className='pt-2 text-white'>Không có diễn viên nào</p>;
    }
    return (
        <div className='lg:m-4 m-0'>
            <Title title='Diễn viên' className='text-white font-bold lg:text-2xl md:text-lg text-sm lg:py-4 py-3' />
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-8 gap-4">
                {cast.slice(0, 9).map((actor) => (                                                  
                    <div key={actor.id} className="text-center">
                        <img
                            onClick={() => navigate(`/cast/${actor.id}`)}
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            className="lg:w-24 lg:h-24 md:w-24 md:h-24 w-20 h-20 mx-auto rounded-full object-cover shadow-md cursor-pointer hover:opacity-75"
                        />
                        <p
                            onClick={() => navigate(`/cast/${actor.id}`)}
                            className="text-white lg:text-sm mt-2 text-[10px] font-semibold hover:text-amber-300 cursor-pointer"
                        >
                            {actor.name}
                        </p>

                    </div>
                ))}
            </div>
        </div>
    )
}

