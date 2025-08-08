import React, { useEffect, useState } from 'react'
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';
import { useLoading } from '../../context/LoadingContext';
import { fetchMoviesByOriginCountry } from '../../services/movieApi';
import { CustomPagination } from '../../components/Pagination/CustomPagination';
import { useNavigate, useParams } from 'react-router-dom';
import { usePagination } from '../../hooks/usePagination';
export const CountryMovieList = () => {
    const { code } = useParams()
    const navigate = useNavigate()
    const [countriesMovies, setCountrieMovies] = useState([])
    const { setComponentsLoading, componentsLoading } = useLoading();
    const { currentPage, setCurrentPage, itemsPerPage, startIndex } = usePagination(countriesMovies.length, 32)
    const paginatedMovies = countriesMovies.slice(startIndex, startIndex + itemsPerPage)
    useEffect(() => {
        const getMovies = async () => {
            try {
                setComponentsLoading(true)
                const data = await fetchMoviesByOriginCountry(code);
                setCountrieMovies(data)

            } catch (err) {
                console.log(err);
            } finally {
                setComponentsLoading(false)
            }
        }
        getMovies()
    }, [code])

    useEffect(() => {
        setComponentsLoading(true)
        const timer = setTimeout(() => {
            setCountrieMovies((prev) => [...prev])
            setComponentsLoading(false)
        }, 1500);
        return () => clearTimeout(timer)
    }, [currentPage]
    )
    if (componentsLoading) return null
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
                    totalItems={countriesMovies.length}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </div>

    )
}
