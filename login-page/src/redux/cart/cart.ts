import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ItemType = {
  id: number;
  bookName: string;
  quantity: number;
};

type CartState = {
  cartItems: ItemType[];
};

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ItemType>) => {
      const { id, quantity, bookName } = action.payload;
      const foundItem = state.cartItems.find(item => item.id === id);
      if (foundItem) {
        foundItem.quantity += quantity;
      } else {
        state.cartItems.push({ id, bookName, quantity });
      }
    },
    incrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, decrementQuantity, incrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
