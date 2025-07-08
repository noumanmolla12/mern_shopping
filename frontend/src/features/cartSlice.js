import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          item._id === id ? { ...item, quantity: quantity } : item
        )
      };
    },
    
    
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, updateItemQuantity, removeItem, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
