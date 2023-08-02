import { createSlice } from '@reduxjs/toolkit';

const init_state = {
    waiting: false,
    virgin: true,
    cached_results: [],
    num_results: 0,
    page: 0,
}
export const searchSlice = createSlice({
  name: 'search',
  initialState: init_state,
  reducers: {
    searchSuccess: (state, action) => {
      let pl = action.payload;
      state.cached_results = pl.search;
      state.num_results = pl.num_res;
      state.page = pl.page;
      state.waiting = false;
    },
    searchFail: (state) => {
      state.cached_results = init_state.cached_results,
      state.num_results = init_state.num_results,
      state.page = init_state.page,
      state.waiting = false;
    },
    searchReq: (state) => {
      state.virgin = false;
      state.waiting = true;
      state.error_msg = '';
    }
  },
});

export const { searchSuccess, searchFail, searchReq } = searchSlice.actions;

export default searchSlice.reducer;

