import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    items: itemsSlice,
    user: userSlice,
  },
});

export default store;
