import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemId = item._id || item.productId;
      const existItem = state.cartItems.find((x) => (x._id || x.productId) === itemId);
      if (existItem) {
        // Keep addToCart as an increment operation (useful when adding from product page)
        state.cartItems = state.cartItems.map((x) =>
          (x._id || x.productId) === itemId ? { ...x, qty: x.qty + (item.qty || 1) } : x
        );
      } else {
        const newItem = { ...item, qty: item.qty || 1 };
        state.cartItems = [...state.cartItems, newItem];
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateQty: (state, action) => {
      const { itemId, qty } = action.payload;
      state.cartItems = state.cartItems.map((x) =>
        (x._id || x.productId) === itemId ? { ...x, qty } : x
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((x) => (x._id || x.productId) !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;