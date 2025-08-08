import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { BannerSlider } from './BannerSlider'
export const Banner = () => {
    const { latestMovies } = useAppContext()
    return (
        <BannerSlider movies={latestMovies}/>
    )
}
