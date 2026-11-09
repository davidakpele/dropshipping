import mockData from "../data/mockApi.json";
import marketplaceProducts, {
  getMarketplaceProductById,
  getMarketplaceProductsForCategory,
  getMarketplaceProductsForSearchTerm,
} from "../data/marketplaceProducts";

const success = (data = {}) => ({ status: true, data });

const parseBody = (data) => {
  if (!data) return {};
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }
  return data;
};

const getAddresses = () => {
  try {
    return JSON.parse(localStorage.getItem("mock-delivery-addresses") || "[]");
  } catch (error) {
    return [];
  }
};

const getProductList = (categoryId, query) => {
  const category = mockData.categories.find(
    (item) => String(item.id) === String(categoryId)
  );
  let results = category
    ? getMarketplaceProductsForCategory(category.name)
    : marketplaceProducts;

  const minPrice = Number(query.get("min_price"));
  const maxPrice = Number(query.get("max_price"));
  if (query.has("min_price")) {
    results = results.filter((item) => item.amount >= minPrice);
  }
  if (query.has("max_price")) {
    results = results.filter((item) => item.amount <= maxPrice);
  }

  const minimumDiscount = Number(query.get("discount"));
  if (minimumDiscount) {
    results = results.filter((item) => item.discount >= minimumDiscount);
  }

  if (query.get("key") === "highest-price") {
    results = [...results].sort((first, second) => second.amount - first.amount);
  } else if (query.get("key") === "lowest-price") {
    results = [...results].sort((first, second) => first.amount - second.amount);
  }

  return results;
};

const getMockData = (config) => {
  const baseUrl = config.baseURL || window.location.origin;
  const requestUrl = new URL(config.url || "/", new URL(baseUrl, window.location.origin));
  const pathname = decodeURIComponent(requestUrl.pathname).replace(
    /^\/mock-api\/v1/,
    ""
  );
  const query = requestUrl.searchParams;
  Object.entries(config.params || {}).forEach(([key, value]) => {
    query.set(key, value);
  });
  const method = (config.method || "get").toLowerCase();
  const body = parseBody(config.data);

  if (pathname === "/categories" || pathname === "/categories/numbered") {
    return success({ category: mockData.categories });
  }
  if (pathname === "/categories/popular") {
    const popularCategories = mockData.popularCategories
      .map((id) => mockData.categories.find((category) => category.id === id))
      .filter(Boolean)
      .map((category) => ({
        ...category,
        category_id: category.id,
        image_url: "/images/products/m1",
      }));
    return success({ popular_categories: popularCategories });
  }
  if (pathname === "/brands" || pathname === "/brands/best") {
    return success(
      pathname.endsWith("/best")
        ? { product: mockData.brands }
        : { brands: mockData.brands }
    );
  }
  if (pathname === "/products/best-deals") {
    return success({
      products: [...marketplaceProducts]
        .sort((first, second) => second.discount - first.discount)
        .slice(0, 6),
    });
  }
  if (pathname === "/products/latest-products") {
    return success({ products: marketplaceProducts.slice(0, 6) });
  }
  if (pathname === "/banner/home-top") return success({ banners: mockData.banners });
  if (pathname === "/likeable-products") {
    return success({ likeable_products: marketplaceProducts.slice(0, 6) });
  }
  if (pathname === "/general-search-products") {
    const searchTerm = query.get("seach_term") || query.get("search_term") || "";
    return success({
      search_results: {
        data: getMarketplaceProductsForSearchTerm(searchTerm),
        meta: { links: [] },
      },
    });
  }
  if (pathname === "/search-products") {
    const categoryId = query.get("category_id");
    return success({
      products: getProductList(categoryId, query),
    });
  }

  const categoryProductsMatch = pathname.match(
    /^\/products\/all\/category\/([^/]+)$/
  );
  if (categoryProductsMatch) {
    const categoryId = categoryProductsMatch[1] === "null"
      ? null
      : categoryProductsMatch[1];
    return success({
      products: { data: getProductList(categoryId, query), meta: { links: [] } },
    });
  }

  if (pathname === "/products/details" || pathname.startsWith("/products/details/")) {
    const id = pathname.split("/").pop();
    return success({ product: getMarketplaceProductById(id) || marketplaceProducts[0] });
  }
  if (pathname.startsWith("/products/similar/")) {
    const id = pathname.split("/").pop();
    return success({
      products: marketplaceProducts.filter((product) => product.id !== id).slice(0, 6),
    });
  }
  if (pathname.startsWith("/products/variation/details/")) {
    const productId = pathname.split("/").pop();
    const product = getMarketplaceProductById(productId) || marketplaceProducts[0];
    return success({
      product_variation: [{ id: `${product.id}-variation`, amount: product.amount, quantity: product.in_stock }],
    });
  }

  if (pathname === "/representatives/orders") {
    return success({ representatives: mockData.representatives.orders });
  }
  if (pathname === "/representatives/logistics") {
    return success({ representatives: mockData.representatives.logistics });
  }
  if (pathname === "/accounts" || pathname === "/accounts/") {
    return success({ ...mockData.account, verification: mockData.account.verification });
  }
  if (pathname === "/accounts/get-notifications") {
    return success({
      notifications: { data: mockData.notifications, links: [] },
    });
  }
  if (pathname === "/login" && method === "post") {
    return success({ token: { accessToken: "mock-access-token" } });
  }
  if (pathname === "/register" || pathname === "/register-otp") {
    return success({ message: "Mock registration accepted" });
  }
  if (pathname === "/forgot/password" || pathname === "/reset/password") {
    return success({ message: "Mock request accepted" });
  }

  if (pathname === "/locations/states") return success({ states: mockData.states });
  if (pathname.startsWith("/locations/state/")) {
    const stateId = Number(pathname.split("/").pop());
    return success({
      lgs: mockData.localGovernments.filter((item) => item.state_id === stateId),
    });
  }
  if (pathname.startsWith("/locations/states/cities/")) {
    const stateCode = pathname.split("/").pop();
    return success({
      cities: mockData.cities.filter((item) => item.stateCode === stateCode),
    });
  }
  if (pathname === "/address/types") {
    return success({ address_types: mockData.addressTypes });
  }
  if (pathname === "/payments/method") {
    return success({ payment_methods: mockData.paymentMethods });
  }
  if (pathname === "/shipment/shipping/types") {
    return success({ shipping: mockData.shippingMethods });
  }
  if (pathname === "/shipment/rate") {
    return success({ rate: { amount: 3500, delivery_time: "2-5 business days" } });
  }

  if (pathname === "/accounts/default/delivery/address") {
    return success({ delivery_addresses: getAddresses()[0] || null });
  }
  if (pathname === "/accounts/delivery/addresses") {
    const addresses = getAddresses();
    return success({
      delivery_addresses: {
        data: addresses,
        links: [],
        per_page: 10,
        last_page: 1,
      },
    });
  }
  if (pathname === "/accounts/delivery/address" && method === "post") {
    const addresses = getAddresses();
    const address = { ...body, id: Date.now(), is_default: addresses.length ? body.is_default : 1 };
    const updatedAddresses = body.is_default
      ? [address, ...addresses.map((item) => ({ ...item, is_default: 0 }))]
      : [...addresses, address];
    localStorage.setItem("mock-delivery-addresses", JSON.stringify(updatedAddresses));
    return success({ delivery_address: address, message: "Address saved locally" });
  }
  if (pathname.startsWith("/accounts/change/default/address/") || pathname === "/accounts/change/default/address") {
    const addresses = getAddresses().map((item) => ({
      ...item,
      is_default: String(item.id) === String(body.id) ? 1 : 0,
    }));
    localStorage.setItem("mock-delivery-addresses", JSON.stringify(addresses));
    return success({ message: "Default address updated locally" });
  }
  if (pathname.startsWith("/accounts/delete-delivery-address/")) {
    const id = pathname.split("/").pop();
    localStorage.setItem(
      "mock-delivery-addresses",
      JSON.stringify(getAddresses().filter((item) => String(item.id) !== id))
    );
    return success({ message: "Address removed locally" });
  }

  if (pathname === "/carts") return success({ cart: [] });
  if (pathname === "/saved-products/saved-items") {
    return success({ saved_products: [], saved_items: [] });
  }
  if (pathname === "/products/recently/viewed") {
    return success({ viewed_product: [] });
  }
  if (pathname.startsWith("/carts/") || pathname === "/carts") {
    return success({ message: "Cart updated locally" });
  }
  if (pathname.startsWith("/saved-products/") || pathname.startsWith("/products/remove/saved")) {
    return success({ message: "Saved items updated locally" });
  }
  if (pathname.startsWith("/orders/checkout")) {
    return success({ orders: { order_code: `MOCK-${Date.now()}` } });
  }
  if (pathname === "/orders/get-order-coupon") {
    return {
      status: true,
      data: {},
      new_amount: 0,
      coupon_amount: 0,
      coupon: 0,
    };
  }
  if (pathname.startsWith("/orders/single/order/") || pathname.startsWith("/orders/single-order/")) {
    return success({ order: { id: pathname.split("/").pop(), products: [], order_code: pathname.split("/").pop() } });
  }
  if (pathname.startsWith("/orders/") || pathname === "/orders") {
    return success({
      orders: {
        data: mockData.orders,
        links: [],
        meta: { links: [], per_page: 10, last_page: 1 },
      },
      order: null,
    });
  }
  if (pathname.startsWith("/wallet-order/transactions/")) {
    return success({
      transactions: {
        data: [],
        links: [],
        per_page: 10,
        last_page: 1,
      },
    });
  }
  if (pathname === "/all-reviews") {
    return success({
      products: { data: [], meta: { links: [], per_page: 10, last_page: 1 } },
    });
  }
  if (pathname.startsWith("/product-orders-with-no-review/")) {
    return success({ products: [] });
  }
  if (pathname === "/list-genders") {
    return success({ genders: [{ id: 1, name: "Female" }, { id: 2, name: "Male" }] });
  }
  if (pathname === "/contact-us") return success({ message: "Message saved locally" });

  return success({ message: "Mock response", data: [], items: [] });
};

const mockApiAdapter = (config) =>
  Promise.resolve({
    data: getMockData(config),
    status: 200,
    statusText: "OK",
    headers: {},
    config,
    request: {},
  });

export default mockApiAdapter;
