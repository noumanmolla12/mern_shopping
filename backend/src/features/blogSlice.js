import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchAllBlogs = createAsyncThunk('blogs/fetchAllBlogs', async () => {
  const response = await axios.get('http://localhost:8080/admin-blog/all');
  return response.data;
});

// Async thunk to fetch a product by ID
export const fetchSingleBlog = createAsyncThunk('blogs/fetchSingleBlog', async (blogId) => {
  const response = await axios.get(`http://localhost:8080/admin-blog/${blogId}`);
 console.log('response',response)
  return response.data;
});



export const addBlog = createAsyncThunk('blogs/addBlog', async (blogData) => {
  const response = await axios.post('http://localhost:8080/admin-blog/add-blog', blogData);
  return response.data;
});




export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ blogId, formData }) => {
  const response = await axios.put(`http://localhost:8080/admin-blog/update-blog/${blogId}`, formData);
  return response.data;
});




export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (blogId) => {
  await axios.delete(`http://localhost:8080/admin-blog/del-blog/${blogId}`);
  return blogId;
});





const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    loading: false,
    error: null,
    blogs: [],
    singleBlog: {
      loading: false,
      error: null,
      data: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blogs = action.payload;
      }) 
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleBlog.pending, (state) => {
        state.singleBlog.loading = true;
        state.singleBlog.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.singleBlog.loading = false;
        state.singleBlog.error = null;
        state.singleBlog.data = action.payload;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.singleBlog.loading = false;
        state.singleBlog.error = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
      })
      .addMatcher(
        (action) => [addBlog.pending, updateBlog.pending, deleteBlog.pending].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addBlog.fulfilled, updateBlog.fulfilled, deleteBlog.fulfilled].includes(action.type),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [addBlog.rejected, updateBlog.rejected, deleteBlog.rejected].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default blogSlice.reducer;
