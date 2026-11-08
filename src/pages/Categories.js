import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategories, setBrands } from "../store/slices/cacheSlice";
// import { currency_formatter } from "../libries";

// components
import { axiosInstance, currency_formatter } from "../libries";
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import BestBrand from "../components/BestBrand";
import LimtedOffer from "../components/LimitedOffer";
import ProdCategory, { ProdCategoryLoader } from "../components/prodCategory";
import { BannerCategory } from "../components/Banners";
import Empty from "../components/Empty";

// imgs
import limtedbanner from "../assets/imgs/banners/ipad-banner.png";
import { useSearchParams } from "react-router-dom";
import CartNotification from "../components/CartNotification";

const Categories = () => {
  const RangeRef = useRef();
  const dispatch = useDispatch();
  const [prods, setProds] = useState([]);
  const { brands, categories } = useSelector((state) => state.cache);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isloading, setIsLoading] = useState(true);

  const filBrands = searchParams.get("brand")?.split(",") || [];

  // const [links, setLinks] = useState([]);
  // declearing variables for categories listing, products, brands && brands, and filter components
  // const [prodOverview, setProdOverview] = useState(null);
  // const [brands && brands, setBrands] = useState([]);

  useEffect(() => {
    axiosInstance()
      .get("/categories")
      .then((resp) => {
        const categoriesResp = resp.data.data.category;
        dispatch(setCategories(categoriesResp));
        // setProdOverview(resp.data.data.category)
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [dispatch]);

  useEffect(() => {
    axiosInstance()
      .get("/brands")
      .then((resp) => {
        const brandResp = resp.data.data.brands;
        dispatch(setBrands(brandResp));
        // setBrands(resp.data.data.brands && brands);
      })
      .catch((err) => {
        return err.response;
      });
  }, [dispatch]);

  // state to show the notification on categories page
  const [showCartNotify, setShowCartNotify] = useState(false);
  const [cartStatus, setCartStatus] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  // functions for price range is down here
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(100000);
  const [priceGap, maximumProdAmount] = [1000, 100_000];
  const [filter_price, setFilterPrice] = useState(false);

  // API call for search endpoint
  useEffect(() => {
    if (searchParams.get("prod")) {
      setIsLoading(true);

      axiosInstance()
        .get(`/general-search-products?seach_term=${searchParams.get("prod")}`)
        .then((resp) => {
          setProds(resp.data.data.search_results.data);
          // setLinks(resp.data.data.search_results.meta.links);
        })
        .catch((err) => console.error(err.response))
        .finally(() => setIsLoading(false));
    }
  }, [searchParams]);

  // API call for products under different categories
  useEffect(() => {
    if (!searchParams.get("prod")) {
      const categories = searchParams.get("categories") ?? null;
      const page = searchParams.get("page") ?? 1;
      const brand = searchParams.get("brand") ?? [];
      setIsLoading(true);

      axiosInstance()
        .get(
          `/products/all/category/${categories}?key=${
            searchParams.get("filter") ?? "all"
          }&page=${page}&discount=${searchParams.get(
            "discount"
          )}&brand=${brand}`
        )
        .then((resp) => {
          const res = resp.data.data.products;

          if (!Array.isArray(res)) {
            setProds(resp.data.data.products.data);
            // setLinks(resp.data.data.products.meta.links);
          } else setProds([]);
        })
        .catch((err) => {
          console.error(err.response);
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchParams]);

  // API call for price filter
  useEffect(() => {
    if (!searchParams.get("prod") && filter_price) {
      axiosInstance()
        .get(
          `/search-products?category_id=${
            searchParams.get("categories") ?? ""
          }&min_price=${minRange}&max_price=${maxRange}`
        )
        .then((resp) => {
          setProds(resp.data.data.products);
        })
        .catch((err) => console.log(err))
        .finally(() => setFilterPrice(!filter_price));
    }
  }, [maxRange, minRange, searchParams, filter_price]);

  const setActiveCategory = (id) => {
    searchParams.delete("prod");
    if (id) {
      searchParams.set("categories", id);
    } else {
      searchParams.delete("categories");
    }

    setSearchParams(searchParams);
    // const elem = document.querySelectorAll(".prodOverview__item");

    // for (let i = 0; i < elem.length; i++) {
    //   elem[i].classList.remove("active");
    //   e.target.classList.add("active");
    // }
  };

  const filterBrands = (id, e) => {
    searchParams.delete("prod");

    setSearchParams(searchParams);

    if (e.target.checked) {
      let brand = !searchParams.get("brand")
        ? `${id}`
        : `${searchParams.get("brand")},${id}`.trim();

      searchParams.set("brand", brand);
      setSearchParams(searchParams);
    } else {
      const brand = searchParams
        .get("brand")
        ?.split(",")
        ?.filter((el) => el !== String(id));

      brand.length
        ? searchParams.set("brand", brand.join(","))
        : searchParams.delete("brand");
      setSearchParams(searchParams);
    }
  };

  const setActiveTab = (activeTab) => {
    searchParams.delete("prod");
    searchParams.set("filter", activeTab);
    setSearchParams(searchParams);
  };

  const filterDiscount = (e) => {
    if (e.target.checked) {
      if (searchParams.get("discount") === String(e.target.value)) {
        searchParams.delete("discount");
        setSearchParams(searchParams);
        e.target.checked = false;
      } else {
        searchParams.set("discount", e.target.value);
        setSearchParams(searchParams);
      }
    }
  };

  const handleRangeMin = (e) => {
    let min = parseInt(e.target.value);
    setMinRange(min);

    if (maxRange - min < priceGap) {
      if (e.target.className === "range__min") {
        setMinRange(maxRange - priceGap);
      } else setMaxRange(min + priceGap);
    } else {
      RangeRef.current.style.left = (min / maximumProdAmount) * 100 + "%";
      RangeRef.current.style.right =
        100 - (maxRange / maximumProdAmount) * 100 + "%";
    }
  };

  const handleRangeMax = (e) => {
    let max = parseInt(e.target.value);
    setMaxRange(max);

    if (max - minRange < priceGap) {
      if (e.target.className === "range__max") {
        setMaxRange(minRange + priceGap);
      } else setMinRange(max - priceGap);
    } else {
      RangeRef.current.style.left = (minRange / maximumProdAmount) * 100 + "%";
      RangeRef.current.style.right =
        100 - (max / maximumProdAmount) * 100 + "%";
    }
  };

  const toggleFilter = () => {
    const aside = document.querySelector(".category__aside");

    aside.classList.contains("category__aside--mobile")
      ? aside.classList.remove("category__aside--mobile")
      : aside.classList.add("category__aside--mobile");
  };

  return (
    <div style={{ position: "relative" }}>
      <Layout>
        <Breadcrumb name="Home > Categories > Computer" />
        <div className="category__pad">
          <BannerCategory />

          <div className="category">
            <div className="container">
              <div className="add_popup"></div>
              <div className="category__wrap">
                <div className="category__aside">
                  <header className="category__header">
                    <div className="category__headerItems back">
                      <span className="arrow-back-outline">
                        <ion-icon
                          name="arrow-back-outline"
                          onClick={toggleFilter}
                        ></ion-icon>
                      </span>
                    </div>
                    <div className="category__headerItems filter">
                      <p>Filter</p>
                    </div>
                    <div className="category__headerItems clear">
                      <p>clear all</p>
                    </div>
                  </header>
                  {!categories ? (
                    <FilterLoader />
                  ) : (
                    <div className="prodOverview">
                      <h3>List of categories</h3>
                      <ul className="prodOverview__listing">
                        <li
                          className={`prodOverview__item ${
                            !searchParams.get("categories") ? "active" : null
                          }`}
                          onClick={(e) => setActiveCategory(null)}
                        >
                          <span>All Categories</span>
                          <span>{""}</span>
                        </li>
                        {categories?.map(({ name, id }) => (
                          <li
                            className={`prodOverview__item ${
                              searchParams.get("categories") === String(id)
                                ? "active"
                                : null
                            }`}
                            onClick={(e) => setActiveCategory(id)}
                            key={id}
                          >
                            <span>{name}</span>
                            <span>{""}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {!brands && brands ? (
                    <FilterLoader />
                  ) : (
                    <div className="filterBrand">
                      <h3 className="filterBrand__header">Brand</h3>
                      {/* <div className="filterBrand__search">
                        <div className="search">
                          <ion-icon name="search-outline"></ion-icon>
                          <input type="search" placeholder="search" />
                        </div>
                      </div> */}
                      <ul className="filterBrand__listing">
                        {brands &&
                          brands?.map(({ name, id }) => (
                            <li className="filterBrand__item" key={id}>
                              <div className="form_group">
                                <input
                                  type="checkbox"
                                  onChange={(e) => filterBrands(id, e)}
                                  checked={filBrands.includes(id.toString())}
                                />
                                <label htmlFor="null">{name}</label>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  <div className="filterDiscount">
                    <div className="filterDiscount__header">
                      <div className="filterDiscount__range">
                        <div className="price__range">
                          <span>
                            Price (<s>N</s>)
                          </span>
                          <span
                            className="apply__range"
                            onClick={() => setFilterPrice(!filter_price)}
                          >
                            Apply
                          </span>
                        </div>
                        <div className="slider">
                          <div className="progress" ref={RangeRef}></div>
                          <div className="range__input">
                            <input
                              type="range"
                              className="range__min"
                              min="0"
                              max="100000"
                              step="100"
                              value={minRange}
                              onChange={handleRangeMin}
                            />
                            <input
                              type="range"
                              className="range__max"
                              min="0"
                              max="100000"
                              step="100"
                              value={maxRange}
                              onChange={handleRangeMax}
                            />
                          </div>
                        </div>
                        <div className="price__range__input">
                          <input
                            type="text"
                            className="input__min"
                            value={currency_formatter(minRange)}
                            disabled
                          />
                          <div className="separator">-</div>
                          <input
                            type="text"
                            className="input__max"
                            value={currency_formatter(maxRange)}
                            disabled
                          />
                        </div>
                      </div>
                      <ul className="filterDiscount__percentage">
                        <h3>Discount Percentage</h3>
                        <li className="filterDiscount__percentageItem">
                          <input
                            type="radio"
                            value="40"
                            name="discount"
                            id="discount"
                            onClick={(e) => filterDiscount(e)}
                          />{" "}
                          40% or more
                        </li>
                        <li className="filterDiscount__percentageItem">
                          <input
                            type="radio"
                            value="30"
                            name="discount"
                            id="discount"
                            onClick={(e) => filterDiscount(e)}
                          />{" "}
                          30% or more
                        </li>
                        <li className="filterDiscount__percentageItem">
                          <input
                            type="radio"
                            value="20"
                            name="discount"
                            id="discount"
                            onClick={(e) => filterDiscount(e)}
                          />{" "}
                          20% or more
                        </li>
                        <li className="filterDiscount__percentageItem">
                          <input
                            type="radio"
                            value="10"
                            name="discount"
                            id="discount"
                            onClick={(e) => filterDiscount(e)}
                          />{" "}
                          10% or more
                        </li>
                      </ul>
                    </div>
                  </div>
                  <LimtedOffer src={limtedbanner} />
                </div>
                <div className="category__main">
                  <h3 className="category__allProd">
                    <span>
                      {document.querySelector(".prodOverview__item.active")
                        ?.innerText ?? "All"}
                    </span>{" "}
                    {!isloading && `(${prods.length})`}
                  </h3>
                  <ul className="category__tab">
                    <li
                      className={`category__tabItem ${
                        (!searchParams.get("filter") ||
                          searchParams.get("filter") === "all") &&
                        "active"
                      }`}
                      onClick={() => setActiveTab("all")}
                    >
                      All
                    </li>
                    <li
                      className={`category__tabItem ${
                        searchParams.get("filter") === "popular" && "active"
                      }`}
                      onClick={() => setActiveTab("popular")}
                    >
                      Popular
                    </li>
                    <li
                      className={`category__tabItem ${
                        searchParams.get("filter") === "newest" && "active"
                      }`}
                      onClick={() => setActiveTab("newest")}
                    >
                      Newest
                    </li>
                    <li
                      className={`category__tabItem ${
                        searchParams.get("filter") === "highest-price" &&
                        "active"
                      }`}
                      onClick={() => setActiveTab("highest-price")}
                    >
                      Higest - Lowest
                    </li>
                    <li
                      className={`category__tabItem ${
                        searchParams.get("filter") === "lowest-price" &&
                        "active"
                      }`}
                      onClick={() => setActiveTab("lowest-price")}
                    >
                      Lowest - Higest
                    </li>
                  </ul>
                  <div className="category__tab--mobile">
                    <div
                      className="category__items category__items1"
                      onClick={toggleFilter}
                    >
                      <p onClick={toggleFilter}>filter</p>
                    </div>
                    <div className="category__items category__items2">
                      <div className="filters">
                        <select name="" id="">
                          <option value="">All</option>
                          <option value="">All</option>
                          <option value="">All</option>
                          <option value="">All</option>
                          <option value="">All</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="category__products">
                    {isloading
                      ? new Array(20)
                          .fill(null)
                          .map((_, i) => <ProdCategoryLoader key={i} />)
                      : prods
                          ?.filter((prod) => {
                            const activeBrands =
                              brands &&
                              brands
                                .filter((brnd) => brnd.active)
                                .map((brnd) => brnd.id);

                            if (activeBrands?.length)
                              return activeBrands.includes(prod.brand_id);
                            return true;
                          })
                          .map((itm) => (
                            <ProdCategory
                              data={itm}
                              key={itm.id}
                              setCartMessage={setCartMessage}
                              setCartStatus={setCartStatus}
                              setShowCartNotify={setShowCartNotify}
                            />
                          ))}
                  </div>
                  {!prods?.length && !isloading && (
                    <Empty emptyTitle="No Item found!" emptySubTitle="" />
                  )}
                  {/* coming back to pagination */}
                  {/* <div className="paginate">
                    {links?.map((link, i) => (
                      <span
                        className={`${link.active ? "active__page" : ""} ${
                          i === 1 || links.length - 1 >= 1
                            ? "display__none"
                            : null
                        }`}
                        key={i}
                        onClick={() =>
                          setSearchParams({ page: Number(link.label) })
                        }
                      >
                        {link.label}
                      </span>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BestBrand />
      </Layout>
      {showCartNotify && (
        <CartNotification
          cartMessage={cartMessage}
          cartStatus={cartStatus}
          setShowCartNotify={setShowCartNotify}
        />
      )}
    </div>
  );
};

export default Categories;

const FilterLoader = () => {
  return (
    <div className="filterBrand placeholder">
      <ul className="filterBrand__listing placeholder">
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
        <li className="filterBrand__item">
          <div className="form_group">
            <label htmlFor="null">name</label>
          </div>
        </li>
      </ul>
    </div>
  );
};
