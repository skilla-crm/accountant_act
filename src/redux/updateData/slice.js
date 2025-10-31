import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  update: { id: 0, count: 0 },
  updateList: 1
};

export const updateDataSlice = createSlice({
  name: 'updateData',
  initialState,
  reducers: {
    setUpdate: (state, action) => {
      state.update = { id: action.payload, count: state.update.count + 1};
    },

    setUpdateList: (state) => {
      state.updateList = state.updateList + 1;
    },
  }
});

export const { setUpdate, setUpdateList } = updateDataSlice.actions;
export default updateDataSlice.reducer;
