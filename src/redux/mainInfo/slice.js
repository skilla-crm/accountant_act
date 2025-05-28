import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  draft: 0,
  customer: {},
  detail: {},
  numberBill: '',
  date: dayjs().locale('ru') || '',
  orders: []
};

export const mainInfoSlice = createSlice({
  name: 'mainInfo',
  initialState,
  reducers: {

    setDraft: (state, action) => {
      state.draft = action.payload;
    },

    setCustomer: (state, action) => {
      state.customer = action.payload;
    },

    setDetail: (state, action) => {
      state.detail = action.payload;
    },

    setNumberBill: (state, action) => {
      state.numberBill = action.payload;
    },

    setDate: (state, action) => {
      state.date = action.payload;
    },

    setOrders: (state, action) => {
      state.orders = action.payload;
    }
  }
});

export const {
  setDraft,
  setCustomer,
  setDetail,
  setNumberBill,
  setDate,
  setOrders
} = mainInfoSlice.actions;
export default mainInfoSlice.reducer;
