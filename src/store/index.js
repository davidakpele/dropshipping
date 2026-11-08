import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import savedItemsReducer from "./slices/savedItemSlice";
import orderReducer from "./slices/orderSlice";
import addressReducer from "./slices/addressSlice";
import recentlyViewedReducer from "./slices/recentlyViewedSlice";
import walletReducer from "./slices/walletSlice";
import categoriesReducer from "./slices/categoriesSlice";
import cacheReducer from "./slices/cacheSlice";
import appReducer from "./slices/appSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    savedItems: savedItemsReducer,
    address: addressReducer,
    recentlyViewed: recentlyViewedReducer,
    wallet: walletReducer,
    categories: categoriesReducer,
    cache: cacheReducer,
  },
});
