import axios from "axios";
import { addCartItem } from "./store/slices/cartSlice";
import mockApiAdapter from "./utils/mockApi";

export const baseUrl = "/mock-api/v1";

axios.defaults.adapter = mockApiAdapter;

export const axiosInstance = (token) => {
  const instance = axios.create({
    baseURL: baseUrl,
    adapter: mockApiAdapter,
    timeout: 10000,
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  });

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.code === "ERR_BAD_REQUEST" && error.response.status === 401) {
        window.location.assign("/login");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const catchAsync = (fn) => fn().catch((e) => console.error(e));

export const send_local_data = (token, data) => {
  const [carts, saves, viewed] = data;

  // upload cart here
  if (token && carts.length) sendCarts(token, carts);
  // send saved product to server
  if (saves.length && token) sendSaves(token, saves);
  // send saved product to server
  if (viewed.length && token) sendViewed(token, viewed);
};

export const getCarts = (token, dispatch) => {
  axiosInstance(token)
    .get("/carts")
    .then((resp) => {
      const carts = resp.data.data.cart;
      if (carts.length) carts.map((itm) => dispatch(addCartItem(itm)));
    })
    .catch(console.error);
};

const sendCarts = (token, carts) => {
  let filtered = carts.map((itm) => ({
    product_id: itm.id,
    quantity: itm.quantity,
  }));

  axiosInstance(token)
    .post(`/carts/add`, { carts: filtered })
    .catch(console.error);
};

const sendSaves = (token, saves) => {
  let filtered = saves.map((itm) => ({
    id: itm.id,
  }));

  axiosInstance(token)
    .post(`/saved-products/saved-items`, {
      products_id: filtered,
    })
    .catch(console.error);
};

const sendViewed = (token, viewed) => {
  let filtered = viewed.map((itm) => ({
    id: itm.id,
  }));

  axiosInstance(token)
    .post(`/saved-products/recently-viewed`, {
      products_id: filtered,
    })
    .catch(console.error);
};

export const currency_formatter = (val) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  })
    .format(val)
    .replace(/NGN/, "₦");
};

export function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}

export function formatTransations(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  let ampm = "AM";

  if (hours >= 12) {
    hours -= 12;
    ampm = "PM";
  }

  if (hours === 0) {
    hours = 12;
  }

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}

export function formatISODateToCustomFormat(isoDate) {
  const date = new Date(isoDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}
