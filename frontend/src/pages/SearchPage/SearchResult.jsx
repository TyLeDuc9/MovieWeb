import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FetchSearchMovie } from '../../services/movieApi';
import { Title } from '../../components/Title/Title';
import { handleNavigateDetail } from '../../utils/handleNavigateDetail';

export const SearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                const data = await FetchSearchMovie(query);
                setResults(data);
            };
            fetchResults();
        }
    }, [query]);

    return (
        <div>
            <Title
                title={`Kết quả tìm kiếm cho: "${query}"`}
                className="mb-6 pt-28 pl-2"
                linkColor="text-white lg:text-base text-lg font-bold"
            />
            <div className='text-white p-6'>
                {results.length === 0 ? (
                    <p className="text-gray-400">Không tìm thấy kết quả.</p>
                ) : (
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4'>
                        {results.map((movie) => (
                            <div key={movie.id}>
                                <div className="w-full h-[250px] overflow-hidden rounded-lg">
                                    <img
                                        onClick={() =>handleNavigateDetail(navigate, movie)}
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
                )}
            </div>
        </div>
    )
}
