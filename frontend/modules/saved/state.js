import { createSlice } from '@reduxjs/toolkit';

export const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    waiting: false,
    movies: [],
  },
  reducers: {
    savedLoadOk: (state, action) =>{
      state.waiting = false;
      state.movies = action.payload;
    },
    savedLoadFail: (state) => {
      state.waiting = false;
      state.movies = [];
    },
    savedLoad: (state) => {
      state.waiting = true;
      state.movies = [];
    },
    savedPostReq: (state) => {},
    savedDeleteReq: (state) => {}
  },
});

export const { 
  savedLoad, savedLoadOk, savedLoadFail, savedPostReq, savedDeleteReq
} = savedSlice.actions;

export default savedSlice.reducer;

