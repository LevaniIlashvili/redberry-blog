import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogType } from "../../../types/types";
import axios from "axios";

type InitialStateType = {
  blogs: Array<BlogType>;
};

const initialState: InitialStateType = {
  blogs: [],
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  try {
    const response = await axios.get(
      "https://api.blog.redberryinternship.ge/api/blogs",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      console.log(action);

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
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

      console.log("setting blogs", blogs);

      state.blogs = blogs;
    });
  },
});

export default blogsSlice.reducer;
