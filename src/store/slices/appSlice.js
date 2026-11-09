import { createSlice, current } from "@reduxjs/toolkit";

import { getState, saveState } from "../global";

import { set_mode } from "../../utils/app";

const AppInitialState = { uiMode: "light" };
set_mode("light");

const appSlice = createSlice({
  name: "app",
  initialState: { ...getState("app", AppInitialState), uiMode: "light" },
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
