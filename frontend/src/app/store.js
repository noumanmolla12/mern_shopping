// store.js
import { configureStore } from '@reduxjs/toolkit';

import productSlice from '../features/productSlice';
import globalSlice from '../features/globalSlice';
import cartSlice from '../features/cartSlice'; 
import customerSlice from '../features/customerSlice';
import categorySlice from '../features/categorySlice';
import blogSlice from '../features/blogSlice';
import userSlice from '../features/userSlice';
import authuserSlice from '../features/authuserSlice';
import orderlistReducer from '../features/orderlistSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
    global: globalSlice,
    cart: cartSlice, 
    customer:customerSlice,
    categories:categorySlice,
    blogs:blogSlice,
    user:userSlice,
    authuser:authuserSlice,
    orderlist:orderlistReducer,
    
  },
});

export default store;
