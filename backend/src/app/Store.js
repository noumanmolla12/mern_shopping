
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '../features/categorySlice';
import productSlice from '../features/productSlice'; // Import the product slice
import pathReducer from '../features/globalpaths';
import blogSlice  from '../features/blogSlice';
import userSlice  from '../features/userSlice';
import adminSlice  from '../features/adminSlice';
import authadminSlice  from '../features/authadminSlice';
import authuserSlice  from '../features/authuserSlice';


const Store = configureStore({
  reducer: {
    categories: categorySlice,
    products: productSlice,
    path: pathReducer,
    admin: adminSlice,
    user: userSlice,
    authadmin: authadminSlice,
    authuser: authuserSlice,
    blogs: blogSlice,
  },
});


export default Store;
