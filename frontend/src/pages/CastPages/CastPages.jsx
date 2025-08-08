import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Title } from '../../components/Title/Title';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '../../hooks/usePagination';
import { CustomPagination } from '../../components/Pagination/CustomPagination';

export const CastPages = () => {
    const navigate = useNavigate()
    const { allActor } = useAppContext();

    const {
        currentPage, setCurrentPage, startIndex, itemsPerPage
    } = usePagination(allActor.length, 36)
    const actorPaginaiton = allActor.slice(startIndex, (startIndex + itemsPerPage))

    return (
        <div className='w-[95%] mx-auto px-4 py-6'>
            <Title
                title="Diễn viên"
                className="mb-6 pt-28"
                linkColor="text-white text-2xl font-bold"
            />
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {actorPaginaiton.map((actor) => (
                    <div key={actor.id} className='relative'>
                        <img
                            onClick={() => navigate(`/cast/${actor.id}`)}
                            src={`https://image.tmdb.org/t/p/w500${actor.profile_path || actor.backdrop_path}`}
                            alt={actor.name}
                            className='w-full lg:h-[300px] h-[200px] rounded-xl hover:opacity-80 transition cursor-pointer'
                        />
                        <span
                            onClick={() => navigate(`/cast/${actor.id}`)}
                            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 
                        text-white cursor-pointer hover:text-amber-300 lg:text-sm text-xs font-semibold">
                            {actor.name}
                        </span>
                    </div>
                ))}
            </div>
            <div className='flex justify-center mt-12'>
                <CustomPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={allActor.length}
                />
            </div>
        </div>
    );
}
