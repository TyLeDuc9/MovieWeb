import React from 'react';
import Slider from 'react-slick';
import { MovieCard } from './MovieCard';
import { Title } from '../Title/Title';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const NextArrow = ({ onClick }) => (
  <div
    className="hidden lg:flex absolute top-[45%] right-1 -translate-y-1/2 z-10 bg-white bg-opacity-50 
    rounded-full p-2 cursor-pointer hover:bg-opacity-80"
    onClick={onClick}
  >
    <FaArrowRight className="text-black" />
  </div>
);

export const PrevArrow = ({ onClick }) => (
  <div
    className="hidden lg:flex absolute top-[45%] -left-1 -translate-y-1/2 z-10 bg-white bg-opacity-50 
    rounded-full p-2 cursor-pointer hover:bg-opacity-80"
    onClick={onClick}
  >
    <FaArrowLeft className="text-black" />
  </div>
);


export const MovieSectionSlider = ({ movies, title, linkColor }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // màn hình nhỏ hơn 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // màn hình nhỏ hơn 768px (tablet)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 bg-[#282a39] rounded-lg">
      <Title title={title} linkColor={linkColor} className="col-span-2 lg:px-8 lg:py-30 px-3 py-2" />
      <div className="col-span-10">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="px-1 lg:px-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
