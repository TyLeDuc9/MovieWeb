import React from 'react'
import { useAppContext } from '../../context/AppContext';
import {MovieSectionSlider } from './MovieSectionSlider';

export const MovieSectionGeneral = ({ title, type , linkColor }) => {
  const context = useAppContext();
  const movies = context[type];
  if (!movies || movies.length === 0) {
    return null;
  }
  return <MovieSectionSlider title={title} movies={movies} linkColor={linkColor}/>;
};

