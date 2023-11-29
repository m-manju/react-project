import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
