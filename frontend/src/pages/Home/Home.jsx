import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Divider } from '../../components/Divider/Divider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieItemThreeGeneral } from '../../components/MovieItemThree/MovieItemThreeGeneral'
import { AnimeNewsGeneral } from '../../components/AnimeNews/AnimeNewsGeneral'
import { CarouselMovieGeneral } from '../../components/CarouselMovie/CarouselMovieGeneral';
import { MovieSectionGeneral } from '../../components/MovieSection/MovieSectionGeneral';
import { MovieTopGeneral } from '../../components/MovieTop/MovieTopGeneral';
import { useLoadingEffect } from '../../hooks/useLoadingEffect';

export const Home = () => {
  useLoadingEffect(500);
  return (
    <div className="">
      <Banner />
      <div className="movie-section w-[95%] mx-auto rounded-2xl">
        <MovieSectionGeneral title="Phim Việt Nam" type="vietNamMovies"
          linkColor="lg:text-3xl text-sm md:text-lg font-bold 
        bg-gradient-to-r from-blue-800 to-blue-200 text-transparent bg-clip-text" />
        <MovieSectionGeneral title="Phim Trung Quốc" type="chineseMovies"
          linkColor="lg:text-3xl text-sm md:text-lg font-bold 
          bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent" />
        <MovieSectionGeneral title="Phim Mỹ/Anh" type="usUkMovies"
          linkColor="lg:text-3xl text-sm md:text-lg font-bold 
        bg-gradient-to-r from-pink-500 to-purple-100 text-transparent bg-clip-text" />
      </div>

      <Divider className='border-red-500 border-2 w-[50%] mx-auto lg:my-16 my-8' />
      <CarouselMovieGeneral title="Phim Điện Ảnh Mới Ra" type="newMovies" />
      <MovieTopGeneral title='Top 10 phim bộ hôm nay' type="seriesMovies" />
      <MovieItemThreeGeneral title='Mãn Nhãn với Phim Chiếu Rạp' type="cinemaMovies" />
      <Divider className='border-red-500 border-2 w-[50%] mx-auto lg:my-16 my-8' />
      <MovieTopGeneral title='Top 10 phim lẻ hôm nay' type="standalMovies" />
      <CarouselMovieGeneral title="Phim Thái New: Không Drama Đời Không Nể" type="thaiLandMovies" />
      <Divider className='border-red-500 border-2 w-[50%] mx-auto lg:my-16 my-8' />
      <MovieItemThreeGeneral title='Phim Sắp Tới Trên Rổ' type="upcomingMovies" />
      <AnimeNewsGeneral title='Kho Tàng Anime Mới Nhất' type="latestAnime" />
      <CarouselMovieGeneral title="Điện Ảnh Hồng Kông ở Chỗ Này Này" type="hongKongMovies" />
      <CarouselMovieGeneral title="Yêu kiểu Mỹ" type="usRomanceMovies" />
      <Divider className='border-red-500 border-2 w-[50%] mx-auto lg:my-16 my-8' />
      <CarouselMovieGeneral title="Giai Điệu Thanh Xuân" type="youthMovies" />
      <CarouselMovieGeneral title="Phim Thiếu Nhi mà Người Lớn Vẫn Thích Cày" type="animationSeriesMovies" />
      <CarouselMovieGeneral title="Tôi nhớ Disney của Ngày Xưa!!!" type="disneyMovies" />
      <CarouselMovieGeneral title="Căng Não Cùng Tội Phạm" type="crimeMovies" />
      <Divider className='border-red-500 border-2 w-[50%] mx-auto lg:my-16 my-8' />

    </div>
  );
};
