import React from 'react';
import { useSelector } from 'react-redux';

import { ALERT_ERR } from './state';

export default function Alert() {
  const alert = useSelector((state) => state.alert);

  let alertOpacity = alert.show ? 'opacity-100' : 'opacity-0';
  let alertLevel = alert.level == ALERT_ERR ? 'alert-error' : 'alert-info';
  let alertIcon = alert.level == ALERT_ERR ?
    <svg xmlns="http://www.w3.org/2000/svg" className="join-item stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>:
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="join-item stroke-current shrink-0 w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
  
  return (
    <div className={`w-full
      ${alertOpacity} transition ease-in duration-300
    `}>
      <div className={`alert ${alertLevel} w-full join`}>
        {alertIcon}
        <div className='join-item text-sm w-fit'>{alert.msg}</div>
      </div>
    </div>
  );
}
