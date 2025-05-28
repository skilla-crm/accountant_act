import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    disabled: false,
 
};

export const mainInfoSlice = createSlice({
    name: 'mainInfo',
    initialState,
    reducers: {
        setCustomer: (state, action) => {
            state.customer = action.payload;
        },

    }
});

export const {
    setCustomer,
    setDetail,
    setNumberBill,
    setDate
} = mainInfoSlice.actions;
export default mainInfoSlice.reducer;
