import React from 'react'
import Slider from 'react-slick';
import { Title } from '../Title/Title';
import { MovieTopCard } from './MovieTopCard';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Default PC
    slidesToScroll: 4,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024, // màn hình nhỏ hơn 1024px
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 767, // màn hình nhỏ hơn 768px (tablet)
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

export const MovieTopSlider = ({ title, movies }) => {
    return (
        <div className='w-[95%] mx-auto lg:mt-16 mt-8'>
            <Title title={title} className='text-white lg:text-2xl md:text-lg text-sm font-bold mb-4 pl-2' />
            <Slider {...settings}>
                {movies && movies.length > 0 ? (
                    movies.map((movie, index) => <MovieTopCard key={movie.id} movie={movie} index={index} />)
                ) : (
                    <p className='text-white text-center'>Không có phim nào được hiển thị.</p>
                )}
            </Slider>
        </div>
    )
}
