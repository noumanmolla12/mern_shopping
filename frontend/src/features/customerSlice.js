

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  success: false,
};

// Define the async thunk for submitting form data
export const submitFormData = createAsyncThunk(
  'customer/submitFormData',
  async (formData, { rejectWithValue }) => {

    console.log('AAA',formData);

    try {
      // Make a POST request to the backend API endpoint for checkout
      const response = await axios.post('http://localhost:8080/customers/checkout', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
console.log(response);
      // Return the response data
      return response.data;
    } catch (error) {
      // Return the error message if request fails
      return rejectWithValue(error.message);
    }
  }
);

// Define the customer slice
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Additional reducers can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state when form submission is in progress
      .addCase(submitFormData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Handle fulfilled state when form submission is successful
      .addCase(submitFormData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      // Handle rejected state when form submission fails
      .addCase(submitFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Payload contains the error message
        state.success = false;
      });
  },
});

// Export the action creators and reducer
export const { /* additional action creators */ } = customerSlice.actions;
export default customerSlice.reducer;
