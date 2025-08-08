import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { CarouselMovieSlider } from './CarouselMovieSlider';

export const CarouselMovieGeneral = ({ title, type }) => {
  const context = useAppContext();
  const movies = context[type]; 

  if (!movies || movies.length === 0) {
    return null; 
  }

  return <CarouselMovieSlider title={title} movies={movies} />;
};
