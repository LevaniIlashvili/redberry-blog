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
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
      const currentDay = currentDate.getDate();

      const blogs = [...action.payload].filter((blog) => {
        const publishDate = new Date(blog.publish_date);
        const publishYear = publishDate.getFullYear();
        const publishMonth = publishDate.getMonth() + 1;
        const publishDay = publishDate.getDate();

        return (
          publishYear < currentYear ||
          (publishYear === currentYear && publishMonth < currentMonth) ||
          (publishYear === currentYear &&
            publishMonth === currentMonth &&
            publishDay <= currentDay)
        );
      });

      state.blogs = blogs;
    },
  },
});

export const { setBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
