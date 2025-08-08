import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const ContriesDropdown = ({ closeDropdown }) => {
  const { countries } = useAppContext();

  return (
    <div className='rounded-lg'>
      {countries && countries.length > 0 ? (
        <ul className='grid grid-cols-2 
        lg:grid-cols-3 lg:gap-4'>
          {countries.map((item) => (
            <li key={item.iso_3166_1} className=' hover:text-amber-300 py-1 px-2'>
              <Link
                to={`/quoc-gia/${item.iso_3166_1}`}
                onClick={closeDropdown}
              >
                {item.english_name}
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
