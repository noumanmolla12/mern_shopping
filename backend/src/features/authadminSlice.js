import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: '',
  error: '',
  loading: false,
  token: '',
};

const apiLink = 'http://localhost:8080/authadmin';

// Async thunk: Login
export const loginUser = createAsyncThunk(
  'useradmin/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiLink}/login`, userData);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk: Logout
export const logoutAuthAdmin = createAsyncThunk(
  'useradmin/logoutAuthAdmin',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${apiLink}/logout`);
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const useradminSlice = createSlice({
  name: 'authadmin',
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      .addCase(logoutAuthAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAuthAdmin.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutAuthAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Logout failed';
      });
  },
});

// Selectors

export const selectUser = (state) => state.authadmin.user;
export const selectToken = (state) => state.authadmin.token;
export const selectError = (state) => state.authadmin.error;
export const selectLoading = (state) => state.authadmin.loading;


// Export actions
export const { clearUserState } = useradminSlice.actions;

// Export reducer
export default useradminSlice.reducer;
