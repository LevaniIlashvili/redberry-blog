import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./redux/categories/categories";
import userReducer from "./redux/user/user";
import blogsReducer from "./redux/blogs/blogs";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    user: userReducer,
    blogs: blogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
