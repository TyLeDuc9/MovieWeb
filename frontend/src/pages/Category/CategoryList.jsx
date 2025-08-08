import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';
import { fetchMoviesByGenre } from '../../services/movieApi';
import { CustomPagination } from '../../components/Pagination/CustomPagination';
import { usePagination } from '../../hooks/usePagination';
import { useLoading } from '../../context/LoadingContext';
export const CategoryList = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [genreIdMovies, setGenreIdMovies] = useState([]);
  const { setComponentsLoading, componentsLoading } = useLoading();


  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    startIndex,
  } = usePagination(genreIdMovies.length, 32);

  const paginatedMovies = genreIdMovies.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const getCategoryList = async () => {
      setComponentsLoading(true);
      setGenreIdMovies([]);
      try {
        const res = await fetchMoviesByGenre(genreId);
        setGenreIdMovies(res);
      } catch (err) {
        console.log(err);
      } finally {
        setComponentsLoading(false);
      }
    };
    getCategoryList();
  }, [genreId]);


  useEffect(() => {
    setComponentsLoading(true);
    const timer = setTimeout(() => {
      setGenreIdMovies((prev) => [...prev]);
      setComponentsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentPage]);

  if (componentsLoading) return null;

  if (paginatedMovies.length === 0) {
    return <p className="text-white text-center">Đang tải phim...</p>;
  }

  return (
    <div className="px-2">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {paginatedMovies.map((movie) => (
          <div key={`${movie.id}-${movie.type}`}>
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
                {movie.original_name || movie.original_title}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <CustomPagination
          currentPage={currentPage}
          totalItems={genreIdMovies.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
