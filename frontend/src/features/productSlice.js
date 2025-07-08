// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('http://localhost:8080/admin-product/all');
    return response.data;
  }
);

// Async thunk to fetch a single product by ID
export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (productId) => {
    const response = await axios.get(`http://localhost:8080/admin-product/${productId}`);
  
    console.log('BBBBB',response);

    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    singleProduct: null // Add a new state property to store the single product
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add case for fetching a single product
      .addCase(fetchSingleProduct.pending, state => {
        state.loading = true;
        state.singleProduct = null; // Clear previous single product data
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchTerm } = productSlice.actions;
export default productSlice.reducer;
