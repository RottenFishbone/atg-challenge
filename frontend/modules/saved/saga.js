import { call, put, select, takeEvery } from 'redux-saga/effects';

import { 
  savedPostReq, 
  savedLoad, 
  savedLoadOk, 
  savedLoadFail,
  savedDeleteReq } from './state'; 

import { postSaved, getSaved, deleteSaved } from '../../api';
import { alertShow } from '../alert/state';

function* savedLoadWorker(){
  try {
    const results = yield call(()=>getSaved());
    yield put(savedLoadOk(results));
  } catch (e) {
    yield put(savedLoadFail());
    yield put(alertShow({msg: e.message, src:'saved-load-failed', level: 1}));
    throw e;
  }
}

export function* savedLoadSaga(){
  yield takeEvery(savedLoad, savedLoadWorker);
}

function* savedPostWorker({payload}){
  try {
    if (yield call(()=>postSaved(payload.id))) {
      yield put(alertShow({msg: "Added to saved!", src:'saved-post-saved', level: 0}));
      yield put(savedLoad());
    } else {
      yield put(alertShow({msg: "You have saved the maximum number of movies!", src:'saved-post-max', level: 1}));
    }
  } catch (e) {
      yield put(alertShow({msg: e.message, src:'saved-post-failed', level: 1}));
  }
}

export function* savedPostSaga(){
  yield takeEvery(savedPostReq, savedPostWorker);
}

function* savedDeleteWorker({payload}) {
  try {
    yield call(()=>deleteSaved(payload.id));
    yield put(alertShow({msg: 'Movie removed from saved', src:'saved-delete-success', level: 0}));
    yield put(savedLoad());
  } catch (e) {
    yield put(alertShow({msg: e.message, src:'saved-delete-failed', level: 1}));
    throw e;
  }
}

export function* savedDeletedSaga(){
  yield takeEvery(savedDeleteReq, savedDeleteWorker);
}


