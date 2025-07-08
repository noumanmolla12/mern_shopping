import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all products
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async () => {
    const response = await axios.get('http://localhost:8080/admin-blog/all');
    return response.data;
  }
);

// Async thunk to fetch a single blog by ID
export const fetchSingleBlog = createAsyncThunk(
  'blogs/fetchSingleBlog',
  async (blogId) => {
    const response = await axios.get(`http://localhost:8080/admin-blog/${blogId}`);
  
    console.log('BBBBB',response);

    return response.data;
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    loading: false,
    error: null,
    singleBlog: null // Add a new state property to store the single product
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBlogs.pending, state => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.error = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add case for fetching a single blog
      .addCase(fetchSingleBlog.pending, state => {
        state.loading = true;
        state.singleBlog = null; // Clear previous single blog data
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchTerm } = blogSlice.actions;
export default blogSlice.reducer;
