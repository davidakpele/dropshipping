import { createSlice, current } from "@reduxjs/toolkit";
import { getState, saveState } from "../global";

const initialState = {
  category: null,
  brand: [],
};

const state = getState("categories", initialState);

const categorySlice = createSlice({
  name: "categories",
  initialState: state,
  reducers: {
    setCategory(state, { payload }) {
      state.category = payload;
      saveState("categories", current(state));
    },

    setBrand(state, { payload }) {
      console.log("hi");
      state.brand.push(payload);
      saveState("categories", current(state));
    },

    clearBrands(state) {
      state.brand = [];
      saveState("categories", current(state));
    },
  },
});

export const { setCategory, setBrand, clearBrands } = categorySlice.actions;

export default categorySlice.reducer;
