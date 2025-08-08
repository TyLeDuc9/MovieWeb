import React from 'react'
import {useAppContext} from '../../context/AppContext'
import {MovieItemThreeSlider} from './MovieItemThreeSlider'
export const MovieItemThreeGeneral = ({title, type}) => {
    const context=useAppContext()
    const movies=context[type]
    if(!movies || movies.length===0){
        return null;
    }
  return (
    <MovieItemThreeSlider title={title} movies={movies}/>
  )
}
