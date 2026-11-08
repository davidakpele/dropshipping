import { createSlice, current } from "@reduxjs/toolkit";
import { getState, saveState } from "../global";

const initialState = {
  banners: null,
  popularCategories: null,
  bestBrands: null,
  latestProduct: null,
  bestDeal: null,

  // call center  caching
  orders: null,
  logistics: null,

  // category caching
  categories: null,
  brands: null,
};

const state = getState("cache", initialState);

const cacheSlice = createSlice({
  name: "cache",
  initialState: state,
  reducers: {
    setBanners(state, { payload }) {
      state.banners = payload;

      saveState("cache", current(state));
    },
    setPopularCategories(state, { payload }) {
      state.popularCategories = payload;

      saveState("cache", current(state));
    },
    setBestBrands(state, { payload }) {
      state.bestBrands = payload;

      saveState("cache", current(state));
    },
    setLatestProduct(state, { payload }) {
      state.latestProduct = payload;

      saveState("cache", current(state));
    },
    setBestDeal(state, { payload }) {
      state.bestDeal = payload;

      saveState("cache", current(state));
    },
    setOrdersRep(state, { payload }) {
      state.orders = payload;

      saveState("cache", current(state));
    },
    setLogisticsRep(state, { payload }) {
      state.logistics = payload;

      saveState("cache", current(state));
    },
    setCategories(state, { payload }) {
      state.categories = payload;

      saveState("cache", current(state));
    },
    setBrands(state, { payload }) {
      state.brands = payload;

      saveState("cache", current(state));
    },
  },
});

export const {
  setBanners,
  setBestBrands,
  setBestDeal,
  setLatestProduct,
  setPopularCategories,
  setLogisticsRep,
  setOrdersRep,
  setCategories,
  setBrands,
} = cacheSlice.actions;

export default cacheSlice.reducer;
