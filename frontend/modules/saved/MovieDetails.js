import React from 'react';
import { useDispatch } from 'react-redux';
import { savedDeleteReq } from './state';

export default function MovieDetails({movie}) {
  const dispatch = useDispatch();

  function onDelete() {
    dispatch(savedDeleteReq({id: movie.imdb_id}));
  }
  return <div className='collapse-content flex-col justify-center bg-base-300'>
    <div className='flex justify-around items-center  w-full
      text-sm'>
     {movie.language && movie.language !== '' && 
      <span className='mx-3'>{movie.language}</span>}

     {movie.runtime && movie.runtime > 0 &&
       <span className='mx-3'>{movie.runtime} mins</span>}
    
     {movie.imdb_rating &&
      <div className='flex m-3'>
        <div className='mx-1 w-4 h-4 bg-[#efc220] mask mask-star'/>
        <div className='mx-1'>{movie.imdb_rating}</div>
     </div>} 
    </div>
    {movie.plot && movie.plot !== '' &&
      <div className='m-2'>
        <span className='font-bold'>Synopsis:</span>
        <span>{movie.plot}</span>
      </div>}
    {movie.actors && movie.actors !== '' && 
      <div className='m-4 flex-row text-sm'>Starring: {movie.actors}</div>}
    {movie.writer && movie.writer !== '' && 
      <div className='m-4 flex-row text-sm'>Written By: {movie.writer}</div>}
    {movie.director && movie.director !== '' && 
      <div className='m-4 flex-row text-sm'>Directed By: {movie.director}</div>}
    <div className='flex justify-end'>
      <button className='btn btn-error text-error-content'
        onClick={onDelete}>
        Remove
      </button>
    </div>
  </div>
}
