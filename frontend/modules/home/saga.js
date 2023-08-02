import { call, put, takeLatest } from 'redux-saga/effects';

import { search } from '../../api';
import { searchSuccess, searchFail, searchReq } from './state';
import { alertShow } from '../alert/state';
function* searchWorker({payload}){
  try {
    const results = yield call(()=>search(payload.title, payload.year, payload.page));
    yield put(searchSuccess({...JSON.parse(results), page: payload.page}));
  } catch (e) {
    yield put(searchFail());
    yield put(alertShow({msg: `Search error: ${e.message}`, src: 'search-exception', level: 1}));
    throw e;
  }
}

export function* searchSaga(){
  yield takeLatest(searchReq, searchWorker);
}

