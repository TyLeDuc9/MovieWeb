import React from 'react'

import { useAppContext } from '../../context/AppContext'
import {MovieTopSlider} from './MovieTopSlider'
export const MovieTopGeneral = ({title, type}) => {
    const context=useAppContext();
    const movies=context[type]
    if(!movies || movies.length===0){
        return null
    }
  return (
    <MovieTopSlider title={title} movies={movies} />
  )
}
