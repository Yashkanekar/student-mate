import { configureStore } from "@reduxjs/toolkit";
import classReducer from "../features/class/classSlice";

const store = configureStore({
  reducer: {
    class: classReducer,
  },
});

export default store;
