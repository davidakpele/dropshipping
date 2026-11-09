import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBanners,
  setBestDeal,
  setCategories,
  setLatestProduct,
  setPopularCategories,
} from "../store/slices/cacheSlice";

// components
import { axiosInstance } from "../libries";
import Layout from "../containers/Layout";
import { Banner } from "../components/Banners";
import HomeCategorySidebar from "../components/HomeCategorySidebar";
import Products from "../components/Products";
import ProductCategories from "../components/PopularCategories";
import BestBrand from "../components/BestBrand";
import Welcome from "../components/Welcome";
import { getMarketplaceCategories } from "../data/marketplaceCategories";
import { getMarketplaceProductsForCategory } from "../data/marketplaceProducts";

const Home = () => {
  const dispatch = useDispatch();
  const [categoryProducts, setCategoryProducts] = useState([]);
  // declearing state for best-deals, popular products, latest-products, welcome-popup and banner

  // const [latestProducts, setLatestProducts] = useState(null);
  // const [bestDeals, setBestDeals] = useState(null);
  // const [popularCat, setPopularCat] = useState(null);

  // const [banners, setBanners] = useState(null);

  const welcomePopup = useSelector((state) => state.auth.welcomePopup);

  // populating the banners, popular categories, latest product, best deal from global store
  const { banners, popularCategories, latestProduct, bestDeal, categories } =
    useSelector((state) => state.cache);

  useEffect(() => {
    axiosInstance()
      .get(`/products/best-deals`)
      .then((resp) => {
        const bestDealResp = resp.data.data.products;
        // setLatestProducts(resp.data.data.products)})
        dispatch(setBestDeal(bestDealResp));
      })
      .catch(console.error);
  }, [dispatch]);

  useEffect(() => {
    axiosInstance()
      .get(`/products/latest-products`)
      .then((resp) => {
        const latestProductResp = resp.data.data.products;
        // setBestDeals(resp.data.data.products)
        dispatch(setLatestProduct(latestProductResp));
      })
      .catch(console.error);
  }, [dispatch]);

  useEffect(() => {
    axiosInstance()
      .get(`/categories/popular`)
      .then((resp) => {
        const popularCategories = resp.data.data.popular_categories;
        // setPopularCat(resp.data.data.popular_categories);
        dispatch(setPopularCategories(popularCategories));
      })
      .catch(console.error);
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(categories)) return;

    axiosInstance()
      .get(`/categories`)
      .then((resp) => {
        dispatch(setCategories(resp.data.data.category));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setCategories([]));
      });
  }, [categories, dispatch]);

  useEffect(() => {
    let isCurrent = true;
    const marketplaceCategories = getMarketplaceCategories(categories);
    const publishCategory = (category, categoryOrder, products) => {
      const categoryKey = category.id ?? category.category_id ?? category.name;

      setCategoryProducts((currentProducts) => {
        const resolvedCategories = currentProducts.filter(
          (item) => item.categoryKey !== categoryKey
        );

        resolvedCategories.push({
          ...category,
          categoryKey,
          categoryOrder,
          products: products.slice(0, 6),
        });

        return resolvedCategories.sort(
          (first, second) => first.categoryOrder - second.categoryOrder
        );
      });
    };

    setCategoryProducts([]);

    marketplaceCategories.forEach((category, categoryOrder) => {
      const localProducts = getMarketplaceProductsForCategory(category.name);
      if (localProducts.length) {
        publishCategory(category, categoryOrder, localProducts);
      }
    });

    marketplaceCategories.forEach(async (category, categoryOrder) => {
      const categoryId = category.id ?? category.category_id;
      let products = [];

      try {
        const requestUrl =
          categoryId != null
            ? `/products/all/category/${categoryId}?key=all&page=1`
            : `/general-search-products?seach_term=${encodeURIComponent(
                category.searchTerm ?? category.name
              )}`;
        const resp = await axiosInstance().get(requestUrl);
        const responseProducts =
          categoryId != null
            ? resp.data.data.products
            : resp.data.data.search_results;
        products = Array.isArray(responseProducts)
          ? responseProducts
          : responseProducts?.data ?? [];
      } catch (error) {
        products = [];
      }

      if (!isCurrent) return;

      const localProducts = getMarketplaceProductsForCategory(category.name);
      const localIds = new Set(localProducts.map((product) => product.id));
      const categoryProducts = [
        ...localProducts,
        ...products.filter((product) => !localIds.has(product.id)),
      ];

      publishCategory(category, categoryOrder, categoryProducts);
    });

    return () => {
      isCurrent = false;
    };
  }, [categories]);

  useEffect(() => {
    axiosInstance()
      .get(`/banner/home-top`)
      .then((resp) => {
        const bannersResp = resp.data.data.banners;
        // console.log(bannersResp);
        // setBanners(resp.data.data.banners);
        dispatch(setBanners(bannersResp));
      })
      .catch(console.error);
  }, [dispatch]);

  // console.log(banners);

  return (
    <>
      <Layout topPadding>
        <div className="home-hero">
          <HomeCategorySidebar />
          <Banner />
        </div>
        <section className="container home-categories">
          <div className="home-categories__category">
            <ion-icon name="bus-outline"></ion-icon>
            Nationwide Delivery
          </div>
          <div className="home-categories__category">
            <ion-icon name="card-outline"></ion-icon>
            Pay Bills
          </div>
          <div className="home-categories__category">
            <ion-icon name="bag-handle-outline"></ion-icon>
            Shop accessories
          </div>
          <div className="home-categories__category">
            <ion-icon name="videocam-outline"></ion-icon>
            Gadgets
          </div>
          <div className="home-categories__category">
            <ion-icon name="logo-apple"></ion-icon>
            Brands
          </div>
          <div className="home-categories__category">
            <ion-icon name="game-controller-outline"></ion-icon>
            Games
          </div>
        </section>
        <ProductCategories data={popularCategories} />
        {categoryProducts?.map((category) => (
          <Products
            key={category.id ?? category.category_id ?? category.name}
            title={category.name}
            data={category.products.slice(0, 6)}
            isNew={false}
            emptyMessage={`No products available in ${category.name} yet.`}
          />
        ))}
        <BestBrand />
        {bestDeal && (
          <Products
            title="Today's Best Deal"
            data={bestDeal.slice(0, 6)}
            isNew={false}
            emptyMessage="No deals available right now."
          />
        )}
        {latestProduct && (
          <Products
            title="Latest Product on ShopNig"
            data={latestProduct.slice(0, 6)}
            isNew={true}
            emptyMessage="No new products available right now."
          />
        )}
      </Layout>
      {!welcomePopup && <Welcome />}
    </>
  );
};

export default Home;
