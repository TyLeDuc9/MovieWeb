import React from 'react'
import './CategoryList'
import { CategoryList } from './CategoryList'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';
import { Title } from '../../components/Title/Title'
import { ComponentLoading } from '../../components/GlobalLoading/ComponentLoading';
export const Category = () => {
  const { genreId } = useParams();
  const { genreMovies } = useAppContext();
  const displayGenreName = genreMovies?.find(item => item.id.toString() === genreId)?.name || 'Thể loại';

  return (
    <div className='w-[95%] mx-auto'>
      <Title title={displayGenreName} className="text-2xl font-bold text-white 
      pt-28 pb-16 px-1" />
      <ComponentLoading />
      <CategoryList />
    </div>
  );
};
