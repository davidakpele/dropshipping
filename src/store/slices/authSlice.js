import { createSlice, current } from "@reduxjs/toolkit";
import { getState, saveState } from "../global";

const initialState = {
  loggedIn: false,
  welcomePopup: true,
  accessToken: null,
  userDetails: null,
};

const state = getState("auth", initialState);
console.log("auth", state);

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    login(state, { payload }) {
      state.loggedIn = true;
      state.accessToken = payload.accessToken;
      state.userDetails = payload.userDetails;
      state.welcomePopup =
        "welcomePopup" in payload ? payload.welcomePopup : true;

      saveState("auth", current(state));
    },
    logout(state) {
      state.loggedIn = false;
      state.accessToken = null;
      state.userDetails = null;

      saveState("auth", current(state));
    },
    updateWelcomePopup(state) {
      state.welcomePopup = true;

      saveState("auth", current(state));
    },

    updateUserDetails(state, { payload }) {
      state.userDetails = payload;

      saveState("auth", current(state));
    },
  },
});

export const { login, logout, updateWelcomePopup, updateUserDetails } =
  authSlice.actions;

export default authSlice.reducer;
