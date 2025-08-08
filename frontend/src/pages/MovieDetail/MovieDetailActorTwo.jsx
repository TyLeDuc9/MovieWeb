import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { Title } from '../../components/Title/Title'
export const MovieDetailActorTwo = () => {
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
        <div className=''>
            <Title title='Diễn viên' className='text-white font-bold text-2xl py-4' />
            <div className="grid grid-cols-3 gap-8">
                {cast.slice(0, 15).map((actor) => (
                    <div key={actor.id} className="text-center">
                        <img
                            onClick={() => navigate(`/cast/${actor.id}`)}
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            className="w-24 h-24 mx-auto rounded-full object-cover
                                 shadow-md cursor-pointer hover:opacity-75"
                        />
                        <p onClick={() => navigate(`/cast${actor.id}`)} className=" text-white 
                   text-sm font-semibold hover:text-amber-300 cursor-pointer">
                            {actor.name}
                        </p>

                    </div>
                ))}
            </div>
        </div>
    )
}
