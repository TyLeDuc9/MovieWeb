import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { toSlug } from '../../utils/toSlugGenre';

export const GenreDropdown = ({ closeDropdown }) => {
  const { genreMovies } = useAppContext();

  return (
    <div className='rounded-lg'>
      {genreMovies && genreMovies.length > 0 ? (
        <ul className='grid grid-cols-3 lg:grid-cols-3 gap-4'>
          {genreMovies.map((item) => (
            <li key={item.id} className='lg:text-sm line-clamp-1 hover:text-amber-300 text-xs'>
              <Link
                to={`/the-loai/${toSlug(item.name)}/${item.id}`}
                onClick={closeDropdown}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-white text-center'>Không có danh mục nào được hiển thị.</p>
      )}
    </div>
  );
};
