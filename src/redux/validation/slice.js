import { createSlice } from '@reduxjs/toolkit';;

const initialState = {
 customerValidation: true,
 detailValidation: true,
 signatoryValidation: true,
 numberValidation: true,
 positionsValidation: true

};

export const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    setCustomerValidation: (state, action) => {
      state.customerValidation = action.payload;
    },

    setDetailValidation: (state, action) => {
      state.detailValidation = action.payload;
    },

    setNumberValidation: (state, action) => {
      state.numberValidation = action.payload;
    },

    setPositionsValidation: (state, action) => {
      state.positionsValidation = action.payload;
    },

    setSignatoryValidation: (state, action) => {
      state.signatoryValidation = action.payload;
    },


  }
});

export const {
  setCustomerValidation,
  setDetailValidation,
  setSignatoryValidation,
  setNumberValidation,
  setPositionsValidation
} = validationSlice.actions;
export default validationSlice.reducer;
