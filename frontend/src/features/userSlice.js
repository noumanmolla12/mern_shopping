import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = 'http://localhost:8080/user';

// GET all users
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const res = await axios.get(`${api}/all`);
  return res.data;
});

// ADD user
export const addUser = createAsyncThunk('user/addUser', async (userData) => {
  const res = await axios.post(`${api}/add-user`, userData);
  return res.data;
});

// UPDATE user by admin or UI
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, userData }) => {
    const res = await axios.put(`${api}/update/${id}`, userData);
    return res.data;
  }
);

// DELETE user by ID
export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  await axios.delete(`${api}/delete/${id}`);
  return id;
});

// FETCH single user
export const fetchSingleUser = createAsyncThunk(
  'user/fetchSingleUser',
  async (id) => {
    const res = await axios.get(`${api}/single-user/${id}`);
    return res.data;
  }
);

// FETCH own profile (by token + sessionStorage)
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      const token = storedUser?.token;

      const res = await axios.get(`${api}/userprofile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error fetching profile');
    }
  }
);

// UPDATE own profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('user'));
      const token = stored?.token;

      const res = await axios.put(`${api}/update-userprofile/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error updating profile');
    }
  }
);

// DELETE own profile
export const deleteUserProfile = createAsyncThunk(
  'user/deleteUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('user'));
      const token = stored?.token;

      await axios.delete(`${api}/delete-userprofile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return userId;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Error deleting profile');
    }
  }
);

// Initial state
const initialState = {
  users: [],
  singleUser: null,
  userProfile: {
    data: null,
    loading: false,
    error: null,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSingleUser: (state) => {
      state.singleUser = null;
    },
    clearUserProfile: (state) => {
      state.userProfile = {
        data: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH ALL USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD USER
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // UPDATE USER (admin)
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
        state.singleUser = null;
      })

      // DELETE USER (admin)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })

      // FETCH SINGLE USER (admin)
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleUser = null;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })

      // FETCH USER PROFILE
      .addCase(fetchUserProfile.pending, (state) => {
        state.userProfile.loading = true;
        state.userProfile.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = action.payload || 'Profile fetch error';
      })

      // UPDATE USER PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.userProfile.loading = true;
        state.userProfile.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = action.payload || 'Profile update error';
      })

      // DELETE USER PROFILE
      .addCase(deleteUserProfile.pending, (state) => {
        state.userProfile.loading = true;
        state.userProfile.error = null;
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.data = null;
        state.users = state.users.filter((u) => u._id !== action.payload); // Optional local cleanup
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.userProfile.loading = false;
        state.userProfile.error = action.payload || 'Profile delete error';
      });
  },
});

export const { clearSingleUser, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
