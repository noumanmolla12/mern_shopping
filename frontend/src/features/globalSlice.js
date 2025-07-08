// globalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imagePath: 'http://localhost:8080/uploads/',
  frontPath: '',
  adminPath: ''
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setImagePath: (state, action) => {
      state.imagePath = action.payload;
    },
    setFrontPath: (state, action) => {
      state.frontPath = action.payload;
    },
    setAdminPath: (state, action) => {
      state.adminPath = action.payload;
    }
  }
});

export const { setImagePath, setFrontPath, setAdminPath } = globalSlice.actions;
// selectors.js
export const selectImagePath = (state) => state.global.imagePath;


export default globalSlice.reducer;
