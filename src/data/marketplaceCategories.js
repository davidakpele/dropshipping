export const fallbackCategories = [
  {
    name: "Women's Clothing",
    searchTerm: "women clothing",
    keywords: ["women", "womens", "female", "ladies"],
  },
  {
    name: "Men's Clothing",
    searchTerm: "men clothing",
    keywords: ["men", "mens", "male", "gents"],
  },
  {
    name: "Children & Baby",
    searchTerm: "children baby",
    keywords: ["children", "child", "baby", "kids"],
  },
  {
    name: "Shoes & Bags",
    searchTerm: "shoes bags",
    keywords: ["shoes", "footwear", "bags"],
  },
  {
    name: "Home & Kitchen",
    searchTerm: "home kitchen",
    keywords: ["home", "kitchen"],
  },
  {
    name: "Beauty & Personal Care",
    searchTerm: "beauty personal care",
    keywords: ["beauty", "cosmetics", "skincare"],
  },
  {
    name: "Phones & Accessories",
    searchTerm: "phones accessories",
    keywords: ["phone", "phones", "mobile"],
  },
  {
    name: "Computers & Electronics",
    searchTerm: "computers electronics",
    keywords: ["computer", "computers", "electronics", "electronic"],
  },
  {
    name: "Groceries & Beverages",
    searchTerm: "groceries beverages",
    keywords: ["grocery", "groceries", "food", "beverage"],
  },
  {
    name: "Sports & Outdoors",
    searchTerm: "sports outdoors",
    keywords: ["sports", "sport", "outdoor"],
  },
  {
    name: "Toys & Games",
    searchTerm: "toys games",
    keywords: ["toy", "toys", "game", "games"],
  },
];

export const getMarketplaceCategories = (categories) => {
  const existingCategories = Array.isArray(categories) ? categories : [];
  const missingCategories = fallbackCategories.filter(
    (fallback) =>
      !existingCategories.some((category) => {
        const name = String(category.name ?? "").toLowerCase();
        return fallback.keywords.some((keyword) =>
          new RegExp(`\\b${keyword}\\b`).test(name),
        );
      }),
  );

  return [...existingCategories, ...missingCategories];
};

export const getCategoryLink = (category) => {
  const categoryId = category.id ?? category.category_id;

  return categoryId != null
    ? `/categories?categories=${categoryId}`
    : `/categories?prod=${encodeURIComponent(
        category.searchTerm ?? category.name,
      )}`;
};

export const getCategoryIcon = (name = "") => {
  const categoryName = name.toLowerCase();

  if (/women|men|cloth|fashion|shoe|wear/.test(categoryName)) {
    return "shirt-outline";
  }
  if (/children|baby|kid|toy|game/.test(categoryName)) {
    return "happy-outline";
  }
  if (/kitchen|grocery|food|beverage/.test(categoryName)) {
    return "basket-outline";
  }
  if (/home|furniture|living/.test(categoryName)) return "home-outline";
  if (/beauty|health|personal care/.test(categoryName)) {
    return "sparkles-outline";
  }
  if (/phone|computer|electronic|laptop|gadget/.test(categoryName)) {
    return "phone-portrait-outline";
  }
  if (/sport|outdoor/.test(categoryName)) return "football-outline";
  if (/bag|accessor/.test(categoryName)) return "bag-handle-outline";

  return "grid-outline";
};
