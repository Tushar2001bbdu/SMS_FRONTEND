"use client"
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice"; // Adjust the path as necessary

const adminStore = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof adminStore.getState>;
export type AppDispatch = typeof adminStore.dispatch;

export default adminStore;
