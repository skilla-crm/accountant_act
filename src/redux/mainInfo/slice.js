import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  draft: 0,
  customer: {},
  detail: {},
  numberAct: '',
  numberInvoice: '',
  numberActFirst: '',
  numberInvoiceFirst: '',
  date: dayjs().locale('ru') || '',
  orders: [],
  signatory: {}
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
      state.signatory = action.payload?.gendir && action.payload?.gendir?.replace(/\s+/g, '') !== ''
        ? { id: 'dir', name: action.payload?.gendir } :
        action.payload?.contacts?.[0]
          ? action.payload?.contacts?.[0]
          : {};
    },

    setDetail: (state, action) => {
      state.detail = action.payload;
    },

    setNumberAct: (state, action) => {
      state.numberAct = action.payload;
    },

    setNumberInvoice: (state, action) => {
      state.numberInvoice = action.payload;
    },

    setNumberActFirst: (state, action) => {
      state.numberActFirst = action.payload;
    },

    setNumberInvoiceFirst: (state, action) => {
      state.numberInvoiceFirst = action.payload;
    },

    setDate: (state, action) => {
      state.date = action.payload;
    },

    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    setSignatory: (state, action) => {
      state.signatory = action.payload;
    }
  }
});

export const {
  setDraft,
  setCustomer,
  setDetail,
  setNumberAct,
  setNumberInvoice,
  setNumberActFirst,
  setNumberInvoiceFirst,
  setDate,
  setOrders,
  setSignatory
} = mainInfoSlice.actions;
export default mainInfoSlice.reducer;
