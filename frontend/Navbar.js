import React from 'react';
import Alert from './modules/alert/Alert';

export default function Navbar() {
  return (
    <div className='flex flex-col sticky top-0 z-50'>
    <div className='navbar bg-base-200 bg-opacity-100'>
      <div className='flex-1 text-xl italic'>
        <span className='text-primary font-bold'>ARROW</span>
        Movies  
      </div>

      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 justify-center'>
          <li><a className='font-bold' href="/saved">
            My Movies
          </a></li>
          <li><a className='font-bold' href="/">
            Discover
          </a></li>
        </ul>
      </div>
      </div>
      <Alert/>
    </div>
  );
}
