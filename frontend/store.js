import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import searchReducer from './modules/home/state';
import { searchSaga } from './modules/home/saga';

import alertReducer from './modules/alert/state';
import { alertSaga } from './modules/alert/saga';

import savedReducer from './modules/saved/state';
import { savedDeletedSaga, savedLoadSaga, savedPostSaga } from './modules/saved/saga';

const saga = createSagaMiddleware();
export default configureStore({
  reducer: {
    search: searchReducer,
    alert:  alertReducer,
    saved:  savedReducer,
  },
  middleware: [saga]
});

saga.run(searchSaga);
saga.run(alertSaga);
saga.run(savedLoadSaga);
saga.run(savedPostSaga);
saga.run(savedDeletedSaga);
