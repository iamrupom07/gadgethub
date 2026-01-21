"use client"; // important for Next.js App Router

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // adjust path to your slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
