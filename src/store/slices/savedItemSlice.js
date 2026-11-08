import { createSlice, current } from "@reduxjs/toolkit";
import { getState, saveState } from "../global";

const initialState = {
  items: [],
};

const state = getState("savedItems", initialState);

const savedItemSlice = createSlice({
  name: "savedItems",
  initialState: state,
  reducers: {
    saveItem(state, { payload }) {
      if (
        !state.items.some((itm) => itm.id === payload.id) &&
        typeof payload === "object"
      ) {
        state.items.push(payload);
        saveState("savedItems", current(state));
      }
    },

    removeSavedItem(state, { payload }) {
      const item = state.items.find((itm) => itm.id === payload);
      const index = state.items.indexOf(item);

      if (index > -1) {
        state.items.splice(index, 1);
        saveState("savedItems", current(state));
      }
    },
  },
});

export const { saveItem, removeSavedItem } = savedItemSlice.actions;
export default savedItemSlice.reducer;
