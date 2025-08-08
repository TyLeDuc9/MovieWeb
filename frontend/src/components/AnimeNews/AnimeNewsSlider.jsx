import React, { useRef, useState } from 'react'
import Slider from "react-slick";
import { AnimeNewsCard } from './AnimeNewsCard';
import { Title } from '../Title/Title';
export const AnimeNewsSlider = ({ movies, title }) => {
    const slider1 = useRef();
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
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
        responsive: [
            {
                breakpoint: 1024, // màn hình nhỏ hơn 1024px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
    const handleThumbnailClick = (index) => {
        slider1.current.slickGoTo(index);
        setCurrentSlide(index);
    };


    return (
        <div className='relative lg:my-28 mt-8'>
            <Title title={title} className='text-white lg:text-2xl md:text-lg  text-sm font-bold mb-4 pl-2' />
            <Slider {...mainSettings}>
                {movies.map((movie, index) => (
                    <AnimeNewsCard
                        key={movie.id}
                        movie={movie}
                        isTransitioning={index === currentSlide && isTransitioning}
                    />
                ))}
            </Slider>
            <div className="lg:absolute lg:-bottom-9 lg:left-[105px] lg:w-full lg:max-w-[800px] lg:flex lg:gap-4 hidden ">
                {movies.slice(0, 15).map((movie, index) => (
                    <img
                        key={movie.id}
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        onClick={() => handleThumbnailClick(index)}
                        className={`h-24 w-48 rounded-lg object-cover cursor-pointer border-2 transition duration-300 
                            ${currentSlide === index
                                ? 'border-white scale-110'
                                : 'border-transparent hover:opacity-100'}
                        `}
                    />
                ))}
            </div>
        </div>
    )
}
