import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./redux/categories/categories";
import userReducer from "./redux/user/user";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
