import React from 'react'
import { CarouselMovieCard } from './CarouselMovieCard';
import Slider from "react-slick";
import { Title } from '../Title/Title';
export const CarouselMovieSlider = ({ title, movies }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 6,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // màn hình nhỏ hơn 1024px
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767, // màn hình nhỏ hơn 768px (tablet)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className='w-[95%] mx-auto lg:mt-16 md:mt-8 mt-4'>
      <Title title={title} className='text-white lg:text-2xl md:text-lg text-sm font-bold mb-4 pl-2' />
      <div className='relative mt-4'>
        <Slider {...settings}>
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <CarouselMovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className='text-white text-center w-full py-8'>
              Không có phim nào được hiển thị.
            </div>
          )}
        </Slider>
      </div>
    </div>
  )
}
