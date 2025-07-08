import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';





// Async thunk to fetch all products

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
  const response = await axios.get('http://localhost:8080/admin-product/all');
  return response.data;
});

// Async thunk to fetch a product by ID
export const fetchSingleProduct = createAsyncThunk('products/fetchSingleProduct', async (productId) => {
  const response = await axios.get(`http://localhost:8080/admin-product/${productId}`);
 console.log('response',response)
  return response.data;
});


// Async thunk to handle adding a product
export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  const response = await axios.post('http://localhost:8080/admin-product/add-product', productData);
  return response.data;
});



// Async thunk to handle updating a product
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ productId, formData }) => {
  const response = await axios.put(`http://localhost:8080/admin-product/update/${productId}`, formData);
  return response.data;
});





// Async thunk to handle deleting a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axios.delete(`http://localhost:8080/admin-product/delete/${productId}`);
  return productId;
});




// Create slice for product
const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    error: null,
    products: [],
    singleProduct: {
      loading: false,
      error: null,
      data: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProduct.loading = true;
        state.singleProduct.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct.loading = false;
        state.singleProduct.error = null;
        state.singleProduct.data = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProduct.loading = false;
        state.singleProduct.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = state.products.filter(product => product._id !== action.payload);
      })
      .addMatcher(
        (action) => [addProduct.pending, updateProduct.pending, deleteProduct.pending].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addProduct.fulfilled, updateProduct.fulfilled, deleteProduct.fulfilled].includes(action.type),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addProduct.rejected, updateProduct.rejected, deleteProduct.rejected].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default productSlice.reducer;
