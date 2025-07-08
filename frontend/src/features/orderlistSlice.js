// src/features/orderlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrdersByUserId = createAsyncThunk(
  'orderlist/fetchOrdersByUserId',
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:8080/orderlist/user/${userId}`);
      console.log("✅ API Response:", res.data); // ⬅️ Should log your array
      return res.data;
    } catch (error) {
      console.error("❌ Fetch failed", error);
      return thunkAPI.rejectWithValue(error.response.data || 'Unknown error');
    }
  }
);


const orderlistSlice = createSlice({
  name: 'orderlist',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        console.log("✅ Redux slice received:", action.payload);
        state.loading = false;
        state.orders = action.payload; 
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Fetch failed';
      });
  },
});

export default orderlistSlice.reducer;
