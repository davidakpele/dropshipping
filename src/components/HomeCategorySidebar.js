import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const fallbackCategories = [
  { id: 1, name: "Laptop & Computer" },
  { id: 2, name: "Smart phones & Tablets" },
  { id: 3, name: "Speakers" },
  { id: 4, name: "Gears" },
  { id: 5, name: "Accessories" },
  { id: 6, name: "Flash Drives" },
  { id: 7, name: "Game & Accessories" },
  { id: 8, name: "Phone Accessories" },
  { id: 9, name: "Other categories" },
];

const getSubcategories = (category) =>
  [
    category.subcategories,
    category.subCategories,
    category.sub_categories,
    category.subcategory,
    category.sub_category,
    category.childCategories,
    category.child_categories,
    category.children,
  ].find(Array.isArray) || [];

const HomeCategorySidebar = () => {
  const categories = useSelector((state) => state.cache.categories);
  const [activeCategory, setActiveCategory] = useState(null);
  const items =
    Array.isArray(categories) && categories.length
      ? categories
      : fallbackCategories;
  const activeCategoryId =
    activeCategory?.id ?? activeCategory?.category_id;
  const activeSubcategories = activeCategory
    ? getSubcategories(activeCategory)
    : [];

  useEffect(() => {
    if (!activeCategory) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveCategory(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeCategory]);

  return (
    <aside
      className="home-category-sidebar"
      aria-label="Product categories"
      onMouseLeave={() => setActiveCategory(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setActiveCategory(null);
        }
      }}
    >
      <h2 className="home-category-sidebar__title">All Categories</h2>
      <ul className="home-category-sidebar__list">
        {items.map((category, index) => {
          const categoryId = category.id ?? category.category_id;
          const isActive = activeCategory === category;

          return (
            <li key={categoryId ?? category.name ?? index}>
              <button
                type="button"
                className={isActive ? "active" : ""}
                aria-expanded={isActive}
                aria-controls="home-category-drawer"
                onMouseEnter={() => setActiveCategory(category)}
                onFocus={() => setActiveCategory(category)}
              >
                <ion-icon name="laptop-outline" aria-hidden="true"></ion-icon>
                <span>{category.name}</span>
                <ion-icon
                  className="home-category-sidebar__chevron"
                  name="chevron-forward-outline"
                  aria-hidden="true"
                ></ion-icon>
              </button>
            </li>
          );
        })}
      </ul>
      {activeCategory && (
        <div
          className="home-category-drawer"
          id="home-category-drawer"
          aria-label={`${activeCategory.name} subcategories`}
        >
          <div className="home-category-drawer__header">
            <h3>{activeCategory.name}</h3>
            <button
              type="button"
              aria-label="Close category menu"
              onClick={() => setActiveCategory(null)}
            >
              <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
            </button>
          </div>
          <ul className="home-category-drawer__list">
            {activeSubcategories.map((subcategory, index) => {
              const subcategoryId =
                typeof subcategory === "object"
                  ? subcategory.id ??
                    subcategory.category_id ??
                    activeCategoryId
                  : activeCategoryId;
              const subcategoryName =
                typeof subcategory === "object"
                  ? subcategory.name ?? subcategory.title
                  : subcategory;

              return (
                <li key={subcategoryId ?? subcategoryName ?? index}>
                  <Link
                    to={`/categories?categories=${subcategoryId}`}
                    onClick={() => setActiveCategory(null)}
                  >
                    {subcategoryName}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                to={`/categories?categories=${activeCategoryId}`}
                onClick={() => setActiveCategory(null)}
              >
                View all {activeCategory.name}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default HomeCategorySidebar;
