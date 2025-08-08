import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';
import { CustomPagination } from '../../components/Pagination/CustomPagination';
import { usePagination } from '../../hooks/usePagination';
import { useLoading } from '../../context/LoadingContext';

export const StandaloneList = () => {
  const { allStandalMovies } = useAppContext();
  const { setComponentsLoading, componentsLoading } = useLoading();
  const navigate = useNavigate();

  const {
    currentPage, setCurrentPage, startIndex, itemsPerPage,
  } = usePagination(allStandalMovies.length, 32);

  const [currentMovies, setCurrentMovies] = useState([]);
  useEffect(() => {
    setComponentsLoading(true);
    const timer = setTimeout(() => {
      const sliced = allStandalMovies.slice(startIndex, startIndex + itemsPerPage);
      setCurrentMovies(sliced);
      setComponentsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentPage, allStandalMovies]);

  if (componentsLoading) return null;
  return (
    <div className="px-2">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">

        {currentMovies.map((movie) => (
          <div key={movie.id}>
            <div className="w-full h-[250px] overflow-hidden rounded-lg">
              <img
                onClick={() => handleNavigateDetail(navigate, movie)}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="text-white text-center mt-2">
              <h3
                onClick={() => handleNavigateDetail(navigate, movie)}
                className="lg:text-sm text-xs hover:text-amber-400 line-clamp-1 cursor-pointer"
              >
                {movie.title || movie.name}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-1 mt-2">
                {movie.original_title || movie.original_name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <CustomPagination
          currentPage={currentPage}
          totalItems={allStandalMovies.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
