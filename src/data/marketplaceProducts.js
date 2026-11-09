import productRecords from "./marketplaceProducts.json";

const imageUrl = "/images/products/m1";

const products = productRecords.map((record) => {
  const previousAmount =
    record.previous_amount ?? Math.round(record.amount * 1.08);
  const features = record.features || [];

  return {
    ...record,
    previous_amount: previousAmount,
    discount: ((previousAmount - record.amount) / previousAmount) * 100,
    images: [{ id: `${record.id}-image`, image_url: imageUrl }],
    brand: { name: record.brand || "ShopNig" },
    brand_id: null,
    code: record.sku || record.id,
    sku: record.sku || record.id,
    is_fixed: true,
    in_stock: 10,
    variation_info: null,
    average_rating: 0,
    product_orders: [],
    specification: { features },
  };
});

const containsKeyword = (text, keyword) =>
  new RegExp(`\\b${keyword}\\b`).test(text);

export const getMarketplaceProductsForCategory = (categoryName = "") => {
  const normalizedName = categoryName.toLowerCase();

  return products.filter((product) =>
    product.categoryKeywords.some((keyword) =>
      containsKeyword(normalizedName, keyword),
    ),
  );
};

export const getMarketplaceProductsForSearchTerm = (searchTerm = "") => {
  const normalizedTerm = searchTerm.toLowerCase();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedTerm) ||
      product.categoryKeywords.some((keyword) =>
        containsKeyword(normalizedTerm, keyword),
      ),
  );
};

export const getMarketplaceProductById = (id) =>
  products.find((product) => product.id === id);

export default products;
