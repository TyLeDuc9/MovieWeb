import React, { useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
export const MovieDetailActor = () => {
  const navigate = useNavigate()
  const { id, type } = useParams();
  const { cast, getCast } = useAppContext()

  useEffect(() => {
    getCast(id, type);
  }, [id, type]);

  if (!cast || cast.length === 0) {
    return <p className='pt-2 text-white'>Không có diễn viên nào</p>;
  }

  return (
    <div>
      <h2 className="lg:text-xl text-lg font-bold my-8 text-white">Diễn viên</h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-5 gap-4">
        {cast.slice(0, 15).map((actor) => (
          <div key={actor.id} className="text-center relative">
            <img
              onClick={() => navigate(`/cast/${actor.id}`)}
              src={
                `https://image.tmdb.org/t/p/w185${actor.profile_path}`
              }
              alt={actor.name}
              className="w-full rounded-lg lg:h-[200px] h-[150px] object-cover cursor-pointer hover:opacity-75"
            />
            <p onClick={() => navigate(`/cast${actor.id}`)} className="absolute lg:bottom-10 bottom-6 left-1/2 transform 
            -translate-x-1/2 text-white 
            lg:text-sm text-xs font-semibold hover:text-amber-300 cursor-pointer">
              {actor.name}
            </p>
            <p className="text-xs text-red-200 pt-1">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
