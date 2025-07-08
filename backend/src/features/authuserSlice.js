import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiLink = 'http://localhost:8080/authuser';

// Initial State
const initialState = {
  user: null,
  error: null,
  loading: false,
  token: null,
};

// Login Thunk
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiLink}/login`, userData);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || { errorMessage: 'Login failed' });
    }
  }
);

// Logout Thunk
export const logoutAuthUser = createAsyncThunk(
  'user/logoutAuthUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${apiLink}/logout`);
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    } catch (error) {
      return rejectWithValue(error.response.data || { errorMessage: 'Logout failed' });
    }
  }
);

// Optional Register Thunk
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiLink}/register`, userData);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || { errorMessage: 'Registration failed' });
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'authuser',
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
      })
      .addCase(logoutAuthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAuthUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Logout failed';
      });
  },
});

// Selectors
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectError = (state) => state.user.error;
export const selectLoading = (state) => state.user.loading;

// Actions
export const { clearUserState } = userSlice.actions;

// Reducer
export default userSlice.reducer;
