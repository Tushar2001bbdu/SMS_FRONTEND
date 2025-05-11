"use client"
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";

const adminStore = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof adminStore.getState>;
export type AppDispatch = typeof adminStore.dispatch;

export default adminStore;
