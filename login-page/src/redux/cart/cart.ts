import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ItemType = {
  id: number;
  bookName: string;
  quantity: number;
};

type CartState = {
  cartItems: ItemType[];
  error: string | null; 
};

const initialState: CartState = {
  cartItems: [],
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   addToCart: (state, action: PayloadAction<ItemType>) => {
      try {
        const { id, quantity, bookName } = action.payload;
        const foundItem = state.cartItems.find(item => item.id === id);
        if (foundItem) {
          foundItem.quantity += quantity;
        } else {
          state.cartItems.push({ id, bookName, quantity });
        }
        state.error = null;
      } catch (error) {
        state.error = 'Error adding item to cart';
      }
    },
    incrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      try {
        const { id } = action.payload;
        const item = state.cartItems.find(item => item.id === id);
        if (item) {
          item.quantity += 1;
          state.error = null; 
        }
      } catch (error) {
        state.error = 'Error incrementing quantity';
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      try {
        const { id } = action.payload;
        const item = state.cartItems.find(item => item.id === id);
        if (item && item.quantity > 0) {
          item.quantity -= 1;
          state.error = null; 
        }
      } catch (error) {
        state.error = 'Error decrementing quantity';
      }
    },
  },
});

export const { addToCart, decrementQuantity, incrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
