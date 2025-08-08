import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { AnimeNewsSlider } from './AnimeNewsSlider'
export const AnimeNewsGeneral = ({ title, type }) => {
  const context = useAppContext()
  const movies = context[type]
  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div className='w-[95%] mx-auto lg:my-16 my-8'>
      <AnimeNewsSlider title={title} movies={movies} />
    </div>

  )
}
