import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savedLoad } from './state';

import MovieTitle from './MovieTitle';
import MovieDetails from './MovieDetails';

export default function Saved() {
    const saved = useSelector((state) => state.saved);
    const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(savedLoad());
    }, []);
    return (
      <div className='rounded-box flex-col my-4 z-10'>
      <div className='flex justify-center'>
      
      {(function(){
        if (saved.movies.length > 0) {
        return <div className='join join-vertical w-full justify-center max-w-2xl bg-base-200'>
          {saved.movies.map(movie => {
          return <div key={movie.imdb_id} className='collapse collapse-arrow join-item border border-dotted'>
            <input type='radio' name='accordion'/>
            <MovieTitle movie={movie} />
            <MovieDetails movie={movie} />
            </div>
          })}
          </div>;
        }
        else {
          return <span className='bg-base-100 my-10 text-xl'>
            You haven't saved any movies yet!
          </span>
        }
      }())}

      </div>
      </div>
    );
}
