import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchKoreanMovies,
  fetchChineseMovies,
  fetchUsUkMovies,
  fetchTopTenSeriesMovies,
  fetchCinemaMovies,
  fetchTopTenStandaloneMovies,
  fetchThaiLandMovies,
  fetchUpComingMovies,
  fetchNowPlayingMovies,
  fetchHongKongMovies,
  fetchUsRomanceMovies,
  fetchYouthMovies,
  fetchAnimationSeriesMovies,
  fetchDisneyMovies,
  fetchCrimeSeries,
  fetchLatest6Movies,
  fetchLatestAnime,
  fetchVietNamMovies,
  fetchMovieGenres,
  fetchAllStandaloneMovies,
  fetchSeriesMovies,
  fetchAllActors,
  fetchMovieDetails,
  fetchTVDetails,
  fetchCastInfo,
  fetchCastCredits,
  fetchMovieCredits,
  fetchTVCredits,
  fetchRecommentMovies,
  fetchRecommentTVShows,
  FetchSearchMovie,
  fetchAllCountries,
} from '../services/movieApi';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [koreanMovies, setKoreanMovies] = useState([]);
  const [chineseMovies, setChineseMovies] = useState([]);
  const [usUkMovies, setUsUkMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [seriesMovies, setSeriesMovies] = useState([]);
  const [cinemaMovies, setCinemaMovies] = useState([]);
  const [standalMovies, setStandalMovies] = useState([]);
  const [thaiLandMovies, setThaiLandMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [hongKongMovies, setHongKongMovies] = useState([]);
  const [usRomanceMovies, setUsRomanceMovies] = useState([]);
  const [youthMovies, setYouthMovies] = useState([]);
  const [animationSeriesMovies, setAnimationSeriesMovies] = useState([]);
  const [disneyMovies, setDisneyMovies] = useState([]);
  const [crimeMovies, setCrimeMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestAnime, setLatestAnime] = useState([]);
  const [vietNamMovies, setVietNamMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [allStandalMovies, setAllStandalMovies] = useState([]);
  const [allSeriesMovies, setAllSeriesMovies] = useState([]);
  const [allActor, setAllActor] = useState([]);
  const [movieDetail, setMovieDetail] = useState(null);
  const [countries, setCountries] = useState([]);


  const getMovieDetail = async (id, type) => {
    try {
      const res = type === 'movie' ? await fetchMovieDetails(id) : await fetchTVDetails(id);
      setMovieDetail({ ...res.data, type });
    } catch (err) {
      console.error('Lỗi khi fetch chi tiết phim:', err);
    }
  };



  const [castInfo, setCastInfo] = useState(null);
  const getCastInfo = async (id) => {
    try {
      const data = await fetchCastInfo(id);
      setCastInfo(data);
    } catch (error) {
      console.error('Lỗi khi fetch cast info:', error);
    }
  };

  const [castCredits, setCastCredits] = useState(null)
  const getCastCredits = async (id) => {
    try {
      const res = await fetchCastCredits(id);
      setCastCredits(res)
    } catch (err) {
      console.log(err);
    }
  }


  const [cast, setCast] = useState([]);

  const getCast = async (id, type) => {
    try {
      const res = type === 'movie' ? await fetchMovieCredits(id) : await fetchTVCredits(id);
      setCast(res);
    } catch (err) {
      console.error('Lỗi khi fetch cast:', err);
    }
  };

  const [recomment, setRecomment] = useState([])
  const getRecomment = async (id, type) => {
    try {
      const res = type === 'movie' ? await fetchRecommentMovies(id) : await fetchRecommentTVShows(id)
      setRecomment(res)
    } catch (err) {
      console.log(err);
    }
  }

  const [searchMovies, setSearchMovies] = useState([]);


  const getSearchMovies = async (query) => {
    if (!query) return setSearchMovies([]);
    try {
      const results = await FetchSearchMovie(query);
      setSearchMovies(results);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      setSearchMovies([]);
    }
  };





  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          resKorean, resChinese, resUsUk, resSeries, resCinema,
          resStandal, resNew, resThaiLand, resUpComing, resHongKong,
          resUsRomance, resYouth, resAnimationSeries, resDisney, resCrime,
          resLatest, resLatestAnime, resViet, resGenre, resAllStandal,
          resAllSeries, resAllActor, resCountries,
        ] = await Promise.all([
          fetchKoreanMovies(), fetchChineseMovies(), fetchUsUkMovies(),
          fetchTopTenSeriesMovies(), fetchCinemaMovies(),
          fetchTopTenStandaloneMovies(), fetchNowPlayingMovies(), fetchThaiLandMovies(),
          fetchUpComingMovies(), fetchHongKongMovies(),
          fetchUsRomanceMovies(), fetchYouthMovies(), fetchAnimationSeriesMovies(),
          fetchDisneyMovies(), fetchCrimeSeries(), fetchLatest6Movies(),
          fetchLatestAnime(), fetchVietNamMovies(), fetchMovieGenres(),
          fetchAllStandaloneMovies(), fetchSeriesMovies(), fetchAllActors(),
          fetchAllCountries(),
        ]);

        setKoreanMovies(resKorean.data.results);
        setChineseMovies(resChinese.data.results);
        setUsUkMovies(resUsUk.data.results);
        setNewMovies(resNew.data.results);
        setSeriesMovies(resSeries);
        setCinemaMovies(resCinema.data.results);
        setStandalMovies(resStandal);
        setThaiLandMovies(resThaiLand.data.results);
        setUpcomingMovies(resUpComing);
        setHongKongMovies(resHongKong.data.results);
        setUsRomanceMovies(resUsRomance.data.results);
        setYouthMovies(resYouth.data.results);
        setAnimationSeriesMovies(resAnimationSeries);
        setDisneyMovies(resDisney.data.results);
        setCrimeMovies(resCrime);
        setLatestMovies(resLatest);
        setLatestAnime(resLatestAnime);
        setVietNamMovies(resViet);
        setGenreMovies(resGenre);
        setAllStandalMovies(resAllStandal);
        setAllSeriesMovies(resAllSeries);
        setAllActor(resAllActor);
        setCountries(resCountries);
      } catch (error) {
        console.error('Lỗi khi gọi API phim:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        koreanMovies,
        chineseMovies,
        usUkMovies,
        newMovies,
        seriesMovies,
        cinemaMovies,
        standalMovies,
        thaiLandMovies,
        upcomingMovies,
        hongKongMovies,
        usRomanceMovies,
        youthMovies,
        animationSeriesMovies,
        disneyMovies,
        crimeMovies,
        latestMovies,
        latestAnime,
        vietNamMovies,
        genreMovies,
        allStandalMovies,
        allSeriesMovies,
        allActor,
        movieDetail, getMovieDetail,
        castInfo, getCastInfo,
        castCredits, getCastCredits,
        cast, getCast,
        recomment, getRecomment,
        searchMovies, getSearchMovies,
        countries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
