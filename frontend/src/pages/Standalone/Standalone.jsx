import React from 'react'
import { StandaloneList } from './StandaloneList'
import { Title } from '../../components/Title/Title';
import { ComponentLoading } from '../../components/GlobalLoading/ComponentLoading';
export const Standalone = () => {



  return (
      <div className='w-[95%] mx-auto'>
        <Title
          title="Phim lẻ"
          className="mb-6 pt-28 pl-2"
          linkColor="text-white text-2xl font-bold"
        />
        <ComponentLoading />
        <StandaloneList />
      </div>
  )
}
