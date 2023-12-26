import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: localStorage.getItem("loggedIn") === "true" ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
      localStorage.setItem("loggedIn", "true");
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
