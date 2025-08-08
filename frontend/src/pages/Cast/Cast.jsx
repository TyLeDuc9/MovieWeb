import React from 'react'
import { CastCredits } from './CastCredits'
import { CastInformation } from './CastInformation'
export const Cast = () => {
  

  return (
    <div className='grid lg:grid-cols-12'>
        <CastInformation />
        <CastCredits />

    </div>
  )
}
