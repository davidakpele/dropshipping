import { createSlice, current } from "@reduxjs/toolkit";
import { saveState, getState } from "../global";

const initialState = {
  wallet: null,
  walletBal: 0

};

const state = getState("wallet", initialState);

const walletSlice = createSlice({
  name: "wallet",
  initialState: state,
  reducers: {
    setWallet(state, { payload }) {
      state.wallet = payload;
      
      saveState("wallet", current(state));
    },
    setWalletAvailableBal(state, { payload }) {
      state.walletBal = payload;
      
      saveState("wallet", current(state));
    },
  },
});

export const { setWallet, setWalletAvailableBal } = walletSlice.actions;

export default walletSlice.reducer;
