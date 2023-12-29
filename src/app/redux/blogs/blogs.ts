import { createSlice } from "@reduxjs/toolkit";
import { BlogType } from "../../../types/types";

type InitialStateType = {
  blogs: Array<BlogType>;
};

const initialState: InitialStateType = {
  blogs: [],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

export const { setBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
