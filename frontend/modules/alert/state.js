import { createSlice } from '@reduxjs/toolkit';

export const ALERT_INFO = 0;
export const ALERT_ERR = 1;

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    msg: '',
    src: '',
    level: 0,
    show: false,
  },
  reducers: {
    alertShow: (state, action) => {
      let pl = action.payload;
      state.msg = pl.msg;
      state.src = pl.src;
      state.level = pl.level;
      state.show = true;
    },
    alertHide: (state, action) => {
      let pl = action.payload;
      if (state.src != pl.src) { return; }
      state.show = false;
      state.msg = '';
    }
  },
});

export const { alertShow, alertHide } = alertSlice.actions;
export default alertSlice.reducer;
