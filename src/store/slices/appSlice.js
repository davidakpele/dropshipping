import { createSlice, current } from "@reduxjs/toolkit";

import { getState, saveState } from "../global";

import { set_mode } from "../../utils/app";

const AppInitialState = {
  uiMode: localStorage.getItem("uiMode") || "light",
};

const appSlice = createSlice({
  name: "app",
  initialState: getState("app", AppInitialState),
  reducers: {
    changeMode(state, { payload }) {
      state.uiMode = payload;

      set_mode(state.uiMode);

      saveState("app", current(state));
    },
  },
});

export const { changeMode } = appSlice.actions;

export default appSlice.reducer;
