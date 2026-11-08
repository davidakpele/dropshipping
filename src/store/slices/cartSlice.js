import { createSlice, current } from "@reduxjs/toolkit";
import { getState, saveState } from "../global";

const initialState = {
  carts: [],
  shippingFee: 0,
  totalOrderFee: 0,
  total_products: 0,
  coupon: null,

  // state for coupon discount
  coupon_amount_percent: null,
  new_total_products: 0,
};

const state = getState("cart", initialState);

const cartSlice = createSlice({
  name: "cart",
  initialState: state,
  reducers: {
    addCartItem(state, { payload }) {
      const cartItem = state.carts.find((itm) => itm.id === payload.id);

      if (cartItem) {
        if (cartItem.variation_info?.length) {
          const variationItem = cartItem.variation_info.find(
            (varInf) => varInf.id === payload.variation_info[0].id
          );

          if (variationItem) {
            variationItem.quantity = payload.variation_info[0].quantity;
          } else cartItem.variation_info.push(payload.variation_info[0]);
        }
      } else state.carts.push(payload);

      saveState("cart", current(state));
    },

    removeCartItem(state, { payload }) {
      const cartItem = state.carts.find((itm) => itm.id === payload.id);

      if (cartItem) {
        if (cartItem.variation_info?.length) {
          cartItem.variation_info = cartItem.variation_info.filter(
            (varInf) => varInf.id !== payload.variation_id
          );
        } else state.carts = state.carts.filter((itm) => itm.id !== payload.id);
      }

      saveState("cart", current(state));
    },

    addCartQuantity(state, { payload }) {
      const cartItem = state.carts.find((itm) => itm.id === payload.id);

      if (cartItem) {
        if (cartItem.variation_info?.length) {
          let itm = cartItem.variation_info.find(
            (varInf) => varInf.id === payload.variation_id
          );

          itm.quantity += 1;
          itm.total = itm.quantity * itm.amount;

          cartItem.quantity = cartItem.variation_info.reduce(
            (sum, itm) => sum + itm.quantity,
            0
          );
          cartItem.total = cartItem.variation_info.reduce(
            (sum, itm) => sum + itm.total,
            0
          );
        } else {
          cartItem.quantity = cartItem.quantity + 1;
          cartItem.total = cartItem.price * cartItem.quantity;
        }
      }

      saveState("cart", current(state));
    },

    removeCartQuantiy(state, { payload }) {
      const cartItem = state.carts.find((itm) => itm.id === payload.id);

      if (cartItem) {
        if (cartItem.variation_info?.length) {
          let var_qan = cartItem.variation_info.find(
            (varInf) => varInf.id === payload.variation_id
          );

          if (var_qan.quantity > 1) {
            var_qan.quantity = var_qan.quantity - 1;
            var_qan.total = cartItem.price * var_qan.quantity;
          }

          cartItem.quantity = cartItem.variation_info.reduce(
            (sum, itm) => sum + itm.quantity,
            0
          );
          cartItem.total = cartItem.variation_info.reduce(
            (sum, itm) => sum + itm.total,
            0
          );
        } else if (cartItem.quantity > 1) {
          cartItem.quantity = cartItem.quantity - 1;
          cartItem.total = cartItem.price * cartItem.quantity;
        }
      }

      saveState("cart", current(state));
    },

    set_total_prods(state, { payload }) {
      state.total_products = payload;
      saveState("cart", current(state));
    },

    clearCarts(state) {
      state.carts = [];
      saveState("cart", current(state));
    },

    set_coupon(state, { payload }) {
      state.coupon = payload;
      saveState("cart", current(state));
    },

    // resetting coupon
    reset_coupon(state) {
      state.coupon = null;
      saveState("cart", current(state));
    },

    set_total(state, { payload }) {
      const cartItem = state.carts.find((itm) => itm.id === payload.id);

      if (cartItem) {
        if (cartItem.variation_info?.length) {
          const variationItem = cartItem.variation_info.find(
            (varInf) => varInf.id === payload.variation_id
          );

          if (variationItem) variationItem.total = payload.total;
        } else cartItem.total = payload.total;
      }

      saveState("cart", current(state));
    },

    // added function to update shipping fee based on selection
    updateShippingFee(state, { payload }) {
      state.shippingFee = payload;
      saveState("cart", current(state));
    },

    // function to reset shipping fee back to 0
    resetShippingFee(state) {
      state.shippingFee = 0;
      saveState("cart", current(state));
    },

    // store the total order fee
    setTotalOrderPrice(state, { payload }) {
      state.totalOrderFee = payload;
      saveState("cart", current(state));
    },

    // function to total fee of order with shipping fee back to 0
    resetTotalOrderPrice(state) {
      state.totalOrderFee = 0;
      saveState("cart", current(state));
    },

    // function to product(s) total fee back to 0
    resetTotalProduct(state) {
      state.total_products = 0;
      saveState("cart", current(state));
    },

    // working on discount around checkout here

    // set coupon percentage and amount
    set_coupon_amount_percentage(state, { payload }) {
      state.coupon_amount_percent = payload;

      saveState("cart", current(state));
    },

    // remove coupon amount
    remove_coupon_amount_percentage(state) {
      state.coupon_amount_percent = null;

      saveState("cart", current(state));
    },

    // set coupon percentage and amount
    set_new_total_products(state, { payload }) {
      state.new_total_products = payload;

      saveState("cart", current(state));
    },

    // remove coupon amount
    remove_new_total_products(state) {
      state.new_total_products = null;

      saveState("cart", current(state));
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  addCartQuantity,
  removeCartQuantiy,
  updateShippingFee,
  setTotalOrderPrice,
  clearCarts,
  isFetchedCart,
  resetShippingFee,
  resetTotalOrderPrice,
  set_total_prods,
  resetTotalProduct,
  setShippingMethodId,
  set_coupon,
  reset_coupon,
  set_total,

  // adding coupon percentage and amount reducer here
  set_coupon_amount_percentage,
  remove_coupon_amount_percentage,
  set_new_total_products,
  remove_new_total_products,
} = cartSlice.actions;

export default cartSlice.reducer;
