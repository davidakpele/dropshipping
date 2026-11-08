import { createSlice, current } from "@reduxjs/toolkit";
import { getState, saveState } from "../global";

const initialState = {
  viewed: [],
};

const state = getState("recentlyViewed", initialState);

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState: state,
  reducers: {
    setViewedItems(state, { payload }) {
      if (!state.viewed.find((itm) => itm.id === payload.id)) {
        state.viewed.push(payload);
        saveState("recentlyViewed", current(state));
      }
    },
  },
});

export const { setViewedItems } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
