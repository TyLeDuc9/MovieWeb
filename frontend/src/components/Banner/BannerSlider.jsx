import React, { useState, useRef } from 'react';
import Slider from "react-slick";
import { BannerCard } from './BannerCard';

export const BannerSlider = ({ movies }) => {
    const slider1 = useRef();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const mainSettings = {
        ref: slider1,
        arrows: false,
        autoplay: false,
        infinite: true,
        speed: 500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        draggable: true,
        beforeChange: () => setIsTransitioning(true),
        afterChange: (newIndex) => {
            setCurrentSlide(newIndex);
            setIsTransitioning(false);
        },
    };

    const handleThumbnailClick = (index) => {
        slider1.current.slickGoTo(index);
        setCurrentSlide(index);
    };

    return (
        <div className="relative lg:mb-8 mb-12">
            <Slider {...mainSettings}>
                {movies.map((movie, index) => (
                    <BannerCard
                        key={movie.id}
                        movie={movie}
                        isTransitioning={index === currentSlide && isTransitioning}
                    />
                ))}
            </Slider>
            <div className="absolute lg:bottom-24 lg:-right-56
            md:bottom-4 md:-right-[70%]
            w-full lg:max-w-[800px] lg:px-6  flex gap-2 -bottom-8 -right-[25%]">
                {movies.slice(0, 6).map((movie, index) => (
                    <img
                        key={movie.id}
                        src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                        alt={movie.title}
                        onClick={() => handleThumbnailClick(index)}
                        className={`lg:h-12 lg:w-20 lg:rounded-lg lg:cursor-pointer 
                           h-6 w-6 rounded-full object-cover border-2 transition duration-300 
                            ${currentSlide === index
                                ? 'border-white scale-100'
                                : 'border-transparent hover:opacity-100'}
                        `}
                    />
                ))}
            </div>
        </div>
    );
};
