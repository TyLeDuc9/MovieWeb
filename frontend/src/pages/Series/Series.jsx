import React from 'react'
import { SeriesList } from './SeriesList'
import { Title } from '../../components/Title/Title';
import { ComponentLoading } from '../../components/GlobalLoading/ComponentLoading';
export const Series = () => {

    return (
        <div className='w-[95%] mx-auto'>
            <Title
                title="Phim bộ"
                className="mb-6 pt-28 pl-1"
                linkColor="text-white text-2xl font-bold"
            />
            <ComponentLoading />
            <SeriesList />
        </div>
    )
}
