import { createSlice, current } from "@reduxjs/toolkit";
import { getState, saveState } from "../global";

const initialState = {
  allAddresses: null,
  defaultAddress: null,
  deliverToAddress: null,
  newAddedAddressForDelivery: null
};

const state = getState("address", initialState);

const addressSlice = createSlice({
  name: "address",
  initialState: state,
  reducers: {
    setAllAddresses(state, { payload }) {
      state.allAddresses = payload;

      saveState("address", current(state));
    },

    setNewAddedAddressForDelivery(state, { payload }) {
      state.newAddedAddressForDelivery = payload;

      saveState("address", current(state));
    },

    setDefaultAddress(state, { payload }) {
      state.defaultAddress = payload;

      saveState("address", current(state));
    },
    setDeliverToAddress(state, { payload }) {
      state.deliverToAddress = payload;

      saveState("address", current(state));
    },
    removeDeliverToAddress(state) {
      state.deliverToAddress = null;

      saveState("address", current(state));
    },
    removeDefaultAddress(state) {
      state.defaultAddress = null;

      saveState("address", current(state));
    },
    removeNewAddedDeliveryAddress(state) {
        state.newAddedAddressForDelivery = null;

        saveState("address", current(state));
    }
  },
});

export const {
  setAllAddresses,
  setDefaultAddress,
  setDeliverToAddress,
  removeDefaultAddress,
  setNewAddedAddressForDelivery,
  removeNewAddedDeliveryAddress,
  removeDeliverToAddress
} = addressSlice.actions;

export default addressSlice.reducer;
