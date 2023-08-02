import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { searchReq } from './state';
import { alertShow } from '../alert/state';
import { savedLoad, savedPostReq } from '../saved/state';

export default function Home() {
    const search = useSelector((state) => state.search);
    const saved = useSelector((state) => state.saved);
    const dispatch = useDispatch();

    function onSearch(){
      if (query == '') {
        dispatch(alertShow({src:'home-search-empty', msg:'Enter a title to search for', level: 0}));
        return;
      } 
      let yearVal = parseInt(year);
      if (year != '') {
          if (isNaN(yearVal) || (!isNaN(yearVal) && yearVal < 1)){
            dispatch(alertShow({src:'home-search-bad', msg:'Year must be a postive number', level: 0}));
            return;
          }
      }

      dispatch(searchReq({
        title: query,
        year: isNaN(yearVal) ? undefined : yearVal,
      }));

      dispatch(savedLoad());
    }

    function onSearchKey(ev) {
      if (ev.keyCode != 13) return;
      onSearch();
    }

    function onSave(id) {
      dispatch(savedPostReq({id: id}))
    }
    
    let [query, setQuery] = React.useState('');
    let [year, setYear] = React.useState('');
    return (
      <div className='rounded-box flex-col my-4'>
        <div className='flex justify-center'>
          <div className='join w-full justify-center max-w-2xl'>
          <input 
            type='text'
            placeholder='Movie Title'
            className='input input-bordered input-sm join-item
              w-full text-center'
            onKeyDown={onSearchKey}
            value={query}
            onChange={(ev)=>setQuery(ev.target.value)}/>
          <input
            type='number'
            placeholder='Year'
            className='input input-bordered input-sm join-item
              w-full max-w-[100px] text-center'
            onKeyDown={onSearchKey}
            value={year}
            onChange={(ev)=>setYear(ev.target.value)}/>
          <button className='btn btn-primary btn-sm'
            onClick={onSearch}>
            Search
          </button>
          </div>
        </div>
  
        <div className='flex justify-center'>
        {(function() {
          // Welcome prompt
          if (search.virgin) {
            return <div className='rounded-box bg-base-100 max-w-2xl w-full'>
              <div className='text-center my-10'>
                Search for movies to add to your collection!
              </div>
            </div>
          } 
          // Spinner
          else if (search.waiting) {
            return <div className='flex flex-col justify-center mx-auto max-w-2xl'>
              <div className='text-xl mx-auto my-10'>Fetching movies...</div>
              <span className='mx-auto loading loading-spinner'></span>
            </div>
          } 
          // Display results
          else {
            if (search.num_results > 0) {
              return <div className='my-2 bg-base-200 flex-col max-w-2xl w-full justify-center mx-auto'>
                <table className='table w-full'>
                  <thead>
                    <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Year</th>
                    <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {search.cached_results.map(listing => {
                    return <tr key={listing.imdb_id}>
                      <td>
                        <div className='avatar w-24 h-30'>
                          {listing.poster != 'N/A' || !listing.poster ? <img src={listing.poster}/> : 
                            <span className='text-3xl'>?</span>}
                        </div>
                      </td>
                      <td>{listing.title}</td>
                      <td>{listing.year}</td>
                      <td>
                        {saved.movies.filter(m=>m.imdb_id==listing.imdb_id).length == 0 &&
                        <button className='btn btn-sm btn-square btn-primary mask mask-heart' 
                          onClick={()=>onSave(listing.imdb_id)}>
                        
                        </button>}
                      </td>
                    </tr>
                  })}
                  </tbody>
                </table>
              </div>
            } 
            else {
              return <div className='rounded-box bg-base-100 max-w-2xl w-full'>
                <div className='text-center my-10'>
                  No titles found :(
                </div>
              </div>
            }
          }
        })()}
        </div> 
      </div>
    );
}
