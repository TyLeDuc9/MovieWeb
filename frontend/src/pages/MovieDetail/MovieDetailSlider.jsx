import React from 'react';
import Slider from 'react-slick';

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 bg-amber-200 bg-opacity-50 
    rounded-full p-2 cursor-pointer hover:bg-opacity-80"
    onClick={onClick}
  >
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 -left-2.5 -translate-y-1/2 z-10 bg-amber-200 bg-opacity-50 
    rounded-full p-2 cursor-pointer hover:bg-opacity-80"
    onClick={onClick}
  >
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </div>
);

export const MovieDetailSlider = ({ posters, backgrounds, onImageClick }) => {
  const posterSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          arrows: false,
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          arrows: false,
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const backdropSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {posters && (
        <div className="relative">
          <Slider {...posterSettings}>
            {posters.slice(0, 30).map((img, index) => (
              <div key={index} onClick={() => onImageClick(posters, index)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`poster-${index}`}
                  className="lg:p-2 p-1 object-cover rounded-md lg:h-[250px] md:h-[200px] h-[100px] cursor-pointer"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
      {backgrounds && (
        <div className="relative">
          <Slider {...backdropSettings}>
            {backgrounds.slice(0, 50).map((img, index) => (
              <div key={index} onClick={() => onImageClick(backgrounds, index)}>
                <img
                  src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                  alt={`backdrop-${index}`}
                  className="lg:p-2 p-1 object-cover rounded-md lg:h-[200px] md:h-[200px] h-[100px] w-full cursor-pointer"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};
