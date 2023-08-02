import React from 'react';

export default function MovieTitle({movie}) {
  let PosterInner = movie.poster != '' && movie.poster != 'N/A' && movie.poster ?
    <img src={movie.poster}/> :
    <span className='text-3xl'>?</span>

  return <div className='collapse-title flex w-full items-center justify-items-center'>
    <div className='avatar w-24 h-30 mx-4'>
      {PosterInner}
    </div>
    <div className='flex flex-col'>
      <span className='flex-row text-xl align-middle mx-4'>{movie.title} ({movie.year})</span>
      <div className='flex-row'>
      { movie.rated && movie.rated != '' && movie.rated != 'N/A' &&
        <div className='badge badge-outline'>{movie.rated}</div>  
      }
      </div>
    </div>
  </div>
}
