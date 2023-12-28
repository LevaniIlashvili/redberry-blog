import { createSlice } from "@reduxjs/toolkit";

interface Categories {
  selectedCategories: string[];
}

const initialState: Categories = {
  selectedCategories: localStorage.getItem("selectedCategories")
    ? JSON.parse(localStorage.getItem("selectedCategories")!)
    : [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
      localStorage.setItem(
        "selectedCategories",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setSelectedCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
