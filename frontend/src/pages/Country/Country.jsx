import React from 'react'
import { CountryMovieList } from './CountryMovieList'
import { Title } from '../../components/Title/Title'
import { ComponentLoading } from '../../components/GlobalLoading/ComponentLoading';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const Country = () => {
  const { code } = useParams(); 
  const { countries } = useAppContext();

  const displayCountry = countries?.find(item => item.iso_3166_1 === code)?.english_name || 'Quốc gia';

  return (
    <div className='w-[95%] mx-auto'>
      <Title title={displayCountry} className="text-2xl font-bold text-white pt-28 pb-16 px-1" />
      <ComponentLoading />
      <CountryMovieList />
    </div>
  )
}
