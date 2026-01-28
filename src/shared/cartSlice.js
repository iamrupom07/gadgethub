import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (type === "increment") item.quantity++;
        if (type === "decrement" && item.quantity > 1) item.quantity--;
      }
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
