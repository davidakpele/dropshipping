import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBanners,
  setBestDeal,
  setLatestProduct,
  setPopularCategories,
} from "../store/slices/cacheSlice";

// components
import { axiosInstance } from "../libries";
import Layout from "../containers/Layout";
import { Banner } from "../components/Banners";
import Products from "../components/Products";
import ProductCategories from "../components/PopularCategories";
import BestBrand from "../components/BestBrand";
import Welcome from "../components/Welcome";

const Home = () => {
  const dispatch = useDispatch();
  // declearing state for best-deals, popular products, latest-products, welcome-popup and banner

  // const [latestProducts, setLatestProducts] = useState(null);
  // const [bestDeals, setBestDeals] = useState(null);
  // const [popularCat, setPopularCat] = useState(null);

  // const [banners, setBanners] = useState(null);

  const welcomePopup = useSelector((state) => state.auth.welcomePopup);

  // populating the banners, popular categories, latest product, best deal from global store
  const { banners, popularCategories, latestProduct, bestDeal } = useSelector(
    (state) => state.cache
  );

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
        <Banner />
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
        <BestBrand />
        <Products title="Today's Best Deal" data={bestDeal} isNew={false} />
        <Products
          title="Latest Product on ShopNig"
          data={latestProduct}
          isNew={true}
        />
      </Layout>
      {!welcomePopup && <Welcome />}
    </>
  );
};

export default Home;
