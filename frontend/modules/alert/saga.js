import { call, put, takeEvery } from 'redux-saga/effects';
import { alertHide, alertShow } from './state';

function* alertWorker({payload}){
  yield call(()=>new Promise(r=>setTimeout(r, 3000)))
  yield put(alertHide({src: payload.src}))
}

export function* alertSaga(){
  yield takeEvery(alertShow, alertWorker);
}
