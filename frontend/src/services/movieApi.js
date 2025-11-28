import axios from 'axios';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'vi-VN'; 
export const fetchUpComingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}&page=1`);
  const allMovies = response.data.results;
  const shuffled = allMovies.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 20)
};
export const fetchNowPlayingMovies = () => {
  return axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&page=12`);
};
export const fetchCinemaMovies = () => {
  return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&page=1`)
}

export const fetchKoreanMovies = () => {
  return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc&language=${LANGUAGE}&page=4`);
};
export const fetchVietNamMovies = async () => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_original_language: 'vi',
      sort_by: 'popularity.desc',
      language: LANGUAGE,
      region: 'VN',
      page: 1,
    }
  });
  const allMovies = response.data.results;
  const shuffled = allMovies.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 20)
};

export const fetchChineseMovies = () => {
  return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=zh&language=${LANGUAGE}&page=1`);
};

export const fetchUsUkMovies = () => {
  return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&language=${LANGUAGE}&page=10`);
};

export const fetchThaiLandMovies = () => {
  return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=th&sort_by=popularity.desc&language=${LANGUAGE}&page=12`);
};

export const fetchHongKongMovies = () => {
  return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=HK&sort_by=popularity.desc&language=${LANGUAGE}&page=10`);
};

export const fetchTopTenSeriesMovies = async () => {
  const response = await axios.get(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=${LANGUAGE}&page=9`);
  const allSeries = response.data.results;
  const shuffled = allSeries.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);

};
export const fetchTopTenStandaloneMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=${LANGUAGE}&page=12`)
  const allSeries = response.data.results;
  const shuffled = allSeries.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10)

}

export const fetchUsRomanceMovies = () => {
  return axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
      with_genres: 10749,
      with_origin_country: 'US',
      sort_by: 'popularity.desc',
      page: 3
    }
  });
};
export const fetchYouthMovies = () => {
  return axios.get(`${BASE_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
      with_original_language: 'ko',
      with_genres: '18,10749',
      sort_by: 'popularity.desc',
      page: 3
    }
  });
};
export const fetchAnimationSeriesMovies = async () => {
  const response = await axios.get(`${BASE_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
      with_genres: '16',
      sort_by: 'popularity.desc',
      page: 1,
    }
  });
  const allSeries = response.data.results;
  const shuffled = allSeries.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 20)

};
export const fetchDisneyMovies = () => {
  return axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
      with_companies: 2,
      sort_by: 'popularity.desc',
      page: 6
    }
  });
};
export const fetchCrimeSeries = async () => {
  const response = await axios.get(`${BASE_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
      with_genres: 80, // Crime
      sort_by: 'popularity.desc',
      page: 8
    }
  });
  const allSeries = response.data.results;
  const shuffled = allSeries.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 20);
};

export const fetchLatest6Movies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
      page:1
    }
  });

  const allMovies = response.data.results;
  const shuffled = allMovies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
};
export const fetchLatestAnime = async () => {
  const response = await axios.get(`${BASE_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
      with_genres: '16',
      with_original_language: 'ja',
      page: 2
    }
  });
  const allSeries = response.data.results;
  const shuffled = allSeries.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 15)

};
export const fetchMovieGenres = async () => {
  const [movieRes, tvRes] = await Promise.all([
    axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
      },
    }),
    axios.get(`${BASE_URL}/genre/tv/list`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
      },
    }),
  ]);

  // Gắn media_type cho từng genre để phân biệt
  const movieGenres = movieRes.data.genres.map((g) => ({
    ...g,
    media_type: 'movie',
  }));

  const tvGenres = tvRes.data.genres
    // Lọc trùng id để tránh genre bị lặp
    .filter((tvGenre) => !movieGenres.some((mg) => mg.id === tvGenre.id))
    .map((g) => ({
      ...g,
      media_type: 'tv',
    }));

  return [...movieGenres, ...tvGenres];
};
export const fetchMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE
    }
  });
};
export const fetchTVDetails = (tvId) => {
  return axios.get(`${BASE_URL}/tv/${tvId}`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE
    }
  });
};
export const fetchTVImages = (tvId) => {
  return axios.get(`${BASE_URL}/tv/${tvId}/images`, {
    params: {
      api_key: API_KEY
    }
  });
};
export const fetchMovieImages = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}/images`, {
    params: {
      api_key: API_KEY
    }
  });
};
export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.cast
};
export const fetchTVCredits = async (tvId) => {
  const response = await axios.get(`${BASE_URL}/tv/${tvId}/credits`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE
    },
  });
  return response.data.cast
};
export const fetchRecommentMovies = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/similar`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE
    },
  });
  return response.data.results;

};
export const fetchRecommentTVShows = async (tvId) => {
  const res = await axios.get(`${BASE_URL}/tv/${tvId}/similar`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE
    },
  });
  return res.data.results;

};
export const fetchCastInfo = async (personId) => {
  const response = await axios.get(`${BASE_URL}/person/${personId}`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });
  return response.data;

};
export const fetchCastCredits = async (personId) => {
  const response = await axios.get(`${BASE_URL}/person/${personId}/combined_credits`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
    },
  });
  return response.data.cast;
};
export const fetchMoviesByGenre = async (genreId) => {
  let allResults = [];
  for (let page = 1; page <= 50; page++) {
    const [movieRes, tvRes] = await Promise.all([
      axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          language: LANGUAGE,
          page,
        },
      }),
      axios.get(`${BASE_URL}/discover/tv`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          language: LANGUAGE,
          page,
        },
      }),
    ]);
    const movieResults = movieRes.data.results.map(item => ({ ...item, type: 'movie' }));
    const tvResults = tvRes.data.results.map(item => ({ ...item, type: 'tv' }));

    allResults = allResults.concat(movieResults, tvResults);
  }
  const uniqueResults = allResults.filter(
    (item, index, self) =>
      index === self.findIndex((m) => m.id === item.id && m.type === item.type)
  );
  return uniqueResults;
};
export const fetchAllStandaloneMovies = async () => {
  const movieMap = new Map();

  for (let page = 1; page <= 50; page++) {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        page,
      },
    });

    response.data.results.forEach((movie) => {
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, movie);
      }
    });
  }

  return Array.from(movieMap.values());
};



export const fetchSeriesMovies = async () => {
  const allMovies = [];

  for (let page = 1; page <= 50; page++) {
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        page,
      },
    });

    allMovies.push(...response.data.results);
  }
  const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie.id, movie])).values());

  return uniqueMovies;
};
export const fetchAllActors = async () => {
  const allActors = [];

  for (let page = 1; page <= 50; page++) {
    const res = await axios.get(`${BASE_URL}/person/popular`, {
      params: {
        api_key: API_KEY,
        page,
      },
    });

    const actors = res.data.results.filter(
      (person) => person.known_for_department === 'Acting'
    );

    allActors.push(...actors);
  }

  const uniqueActors = allActors.filter(
    (actor, index, self) =>
      index === self.findIndex((a) => a.id === actor.id)
  );

  return uniqueActors;
};
export const fetchTrailerById = async (id, mediaType = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/${mediaType}/${id}/videos`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });

    const trailer = response.data.results.find(
      (video) =>
        ['Trailer', 'Teaser'].includes(video.type) &&
        video.site === 'YouTube'
    );

    return trailer || null;
  } catch (error) {
    console.error('Lỗi khi lấy trailer:', error);
    return null;
  }
};
export const FetchSearchMovie = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query,
        language: LANGUAGE,
      },
    });

    const results = response.data.results.filter(
      (item) =>
        item.media_type === 'movie' ||
        item.media_type === 'tv' ||
        item.media_type === 'person'
    );

    return results; // ✅ Trả về toàn bộ kết quả
  } catch (error) {
    console.error('Lỗi khi tìm kiếm:', error);
    return [];
  }
};

export const fetchAllCountries = async () => {
  const res = await axios.get(`${BASE_URL}/configuration/countries`, {
    params: { api_key: API_KEY }
  });

  const allCountries = res.data;


  const popularCountryCodes = [
    'US', 'GB', 'KR', 'JP', 'IN', 'CN', 'FR', 'DE', 'RU', 'VN',
    'ES', 'IT', 'TH', 'CA', 'AU', 'MX', 'BR', 'TW', 'HK',
  ];
  const filteredCountries = allCountries.filter(country =>
    popularCountryCodes.includes(country.iso_3166_1)
  );

  return filteredCountries;
};
export const fetchMoviesByOriginCountry = async (countryCode, totalPages = 50) => {
  const results = [];

  for (let page = 1; page <= totalPages; page++) {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_origin_country: countryCode,
        sort_by: 'popularity.desc',
        page: page,
      }
    });

    results.push(...res.data.results);
  }

  return results; 
};
