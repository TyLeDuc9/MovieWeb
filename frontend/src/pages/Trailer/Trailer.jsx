import React from 'react'
import { TrailerVideo } from './TrailerVideo'
import { MovieDetailInformation } from '../MovieDetail/MovieDetailInformation'
import { TrailerInformation } from './TrailerInformation'
import { TrailerCast } from './TrailerCast'
import { TrailerRecomment } from './TrailerRecomment'
import { Divider } from '../../components/Divider/Divider'
import { Comment } from '../../components/Comment/Comment'

export const Trailer = () => {


  return (
    <div className='w-[95%] mx-auto'>
      <TrailerVideo />
      <div className='grid lg:grid-cols-12 grid-cols-1'>
        <div className='lg:col-span-8'>
          <TrailerInformation />
          <Divider className='border-red-500 border-2 w-[75%] mx-auto my-8' />
          <Comment className='pr-8'/>
        </div>
        <div className='lg:col-span-4 lg:border-l lg:border-b lg:border-l-cyan-50 lg:border-b-amber-50'>
          <TrailerCast />
          <Divider className='border-red-500 border-2 w-[75%] mx-auto my-8' />
          <TrailerRecomment />
        </div>
      </div>
    </div >
  )
}
