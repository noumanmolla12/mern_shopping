import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = 'http://localhost:8080/admin';

// GET - Fetch all admins
export const fetchAdmins = createAsyncThunk('admin/fetchAll', async () => {
  const res = await axios.get(`${api}/all`);
  return res.data;
});

// GET - Fetch single admin by ID
export const fetchAdminById = createAsyncThunk('admin/fetchById', async (id) => {
  const res = await axios.get(`${api}/single-admin/${id}`);
  return res.data;
});


// POST - Add a new admin
export const addAdmin = createAsyncThunk('admin/add', async (admin) => {
  const res = await axios.post(`${api}/add-admin`, admin);
  return res.data;
});

// UPDATE admin
export const updateAdmin = createAsyncThunk('admin/updateAdmin', async ({ id, adminData }) => {
  const res = await axios.put(`${api}/update/${id}`, adminData);
  return res.data;
});


// DELETE - Delete an admin by ID
export const deleteAdmin = createAsyncThunk('admin/delete', async (id) => {
  await axios.delete(`${api}/delete/${id}`);
  return id;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.admins = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
      })

      .addCase(updateAdmin.fulfilled, (state, action) => {
        const index = state.admins.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
      })

      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter((a) => a._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
