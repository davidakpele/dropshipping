import { createSlice, current } from "@reduxjs/toolkit";
import { getState, saveState } from "../global";

const initialState = {
  allorder: null,
};

const state = getState("order", initialState);

const orderSlice = createSlice({
  name: "order",
  initialState: state,
  reducers: {
    setOrders(state, { payload }) {
      state.allorder = payload;

      saveState("order", current(state));
    },
  },
});

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;
