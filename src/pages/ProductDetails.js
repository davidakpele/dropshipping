import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Details from "../components/Details";
import ProdPreviewLoader from "../components/loaders/ProdPreviewLoader";
import ProductPreview from "../components/productPreview";
import { SimilarProductLoader } from "../components/SimilarProduct";
import Specification from "../components/Specification";

// components
import AllRatings from "../components/AllRatings";
import Breadcrumb from "../components/Breadcrumb";
import Explore from "../components/ExploreCategories";
import Ratings from "../components/Ratings";
import SimilarProduct from "../components/SimilarProduct";
import Layout from "../containers/Layout";
import datas from "../data/categories.json";
import { getMarketplaceProductById } from "../data/marketplaceProducts";
import { axiosInstance } from "../libries";

// image
import { useDispatch, useSelector } from "react-redux";
import explore_banner from "../assets/imgs/banners/explore-banner.png";
import icon1 from "../assets/imgs/icons/icon3.png";
import icon2 from "../assets/imgs/icons/icon4.png";
import icon3 from "../assets/imgs/icons/icon5.png";
import icon4 from "../assets/imgs/icons/icon6.png";
import { currency_formatter } from "../libries";
import { addCartItem, removeCartItem } from "../store/slices/cartSlice";
import { setViewedItems } from "../store/slices/recentlyViewedSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [productData] = useState(datas.products.find((itm) => itm.id === 851));
  const [isDetails, setIsDetails] = useState(true);
  const [ratings, setRatings] = useState(false);
  const [isProd, setProd] = useState(false);
  const [similarProd, setSimilarProd] = useState(null);
  const [prodData, setProdData] = useState(null);
  const [popular, setPopular] = useState([]);
  const [is_loading, setIsLoading] = useState(false);
  const userToken = useSelector((state) => state.auth.accessToken);
  const carts = useSelector((state) => state.cart.carts);
  const { id } = useParams();
  const localProduct = getMarketplaceProductById(id);

  const [openRatings, setOpenRatings] = useState(false);

  useEffect(() => {
    if (localProduct) {
      setProdData(localProduct);
      !userToken && dispatch(setViewedItems(localProduct));
      return;
    }

    axiosInstance(userToken)
      .get(`/products/details/${id}`)
      .then((resp) => {
        const prod = resp.data.data.product;
        setProdData(prod);

        !userToken && dispatch(setViewedItems(prod));
      })
      .catch(console.error);
  }, [id, dispatch, userToken, localProduct]);

  useEffect(() => {
    setIsLoading(true);
    if (localProduct) {
      setSimilarProd([]);
      setIsLoading(false);
      return;
    }

    if (id)
      axiosInstance()
        .get(`/products/similar/${id}`)
        .then((resp) => setSimilarProd(resp.data.data.products))
        .catch(console.error)
        .finally(() => setIsLoading(false));
  }, [id, localProduct]);

  useEffect(() => {
    axiosInstance()
      .get(`/products/all/category/null?key=popular`)
      .then((resp) => setPopular(resp.data.data.products.data))
      .catch(console.error);
  }, []);

  // likely causing bug with add to cart (bug resolved***)
  const addCartNoVariation = (item, var_id) => {
    dispatch(
      addCartItem({
        id: item.id,
        src: item.images[0],
        name: item.name,
        brand: item.brand.name,
        color: item.color,
        price: Number(item.amount),
        quantity: 1,
        total: Number(item.amount) * 1,
        variation_info: null, // var_id,
      }),
    );

    if (userToken)
      axiosInstance(userToken)
        .post("/carts/add", {
          carts: [
            {
              product_id: item.id,
              quantity: 1,
            },
          ],
        })
        .then(
          (resp) =>
            resp.data.status &&
            dispatch(
              addCartItem({
                id: item.id,
                src: item.images[0],
                name: item.name,
                brand: item.brand_name,
                color: "white",
                price: item.amount,
                quantity: item.quantity,
                total: item.amount * item.quantity,
                variation_info: null,
              }),
            ),
        )
        .catch(console.error);
    else dispatch(addCartItem(item));
  };

  const removeCart = (item, var_id) => {
    dispatch(removeCartItem({ ...item, variation_id: var_id }));

    if (userToken)
      axiosInstance(userToken)
        .post("/carts/remove", {
          product_id: item.id,
        })
        .then(
          (resp) =>
            resp.data.status && dispatch(removeCartItem(item.id, var_id)),
        )
        .catch(console.error);
    else dispatch(removeCartItem(item.id, var_id));
  };

  const openDetails = () => {
    setIsDetails(true);
    setRatings(false);
    setProd(false);
  };

  const openRating = () => {
    setRatings(true);
    setProd(false);
    setIsDetails(false);
  };

  const openProd = () => {
    setProd(true);
    setIsDetails(false);
    setRatings(false);
  };

  return (
    <>
      <Layout>
        <Breadcrumb name="Product detail >" />
        <div className="container">
          <div className="prodPreview">
            <div className="prodPreview__wrap">
              <div className="prodPreview__main">
                {prodData && !is_loading ? (
                  <ProductPreview data={prodData} setProdData={setProdData} />
                ) : (
                  <ProdPreviewLoader />
                )}
                <div className="details">
                  <div className="details__parts">
                    <div className="details__heading">
                      <div
                        className={`details__head ${
                          isDetails ? " active" : ""
                        }`}
                        onClick={() => openDetails()}
                      >
                        <h4>Key features</h4>
                      </div>
                      <div
                        className={`details__head ${isProd ? " active" : ""}`}
                        onClick={() => openProd()}
                      >
                        <h4>Product details</h4>
                      </div>
                      <div
                        className={`details__head ${ratings ? " active" : ""}`}
                        onClick={() => openRating()}
                      >
                        <h4>Ratings</h4>
                      </div>
                    </div>
                    {!prodData && <ProdPreviewLoader />}
                    {isDetails ? (
                      <Specification
                        data={prodData}
                        dat={
                          prodData?.specification || productData?.specification
                        }
                      />
                    ) : ratings ? (
                      <Ratings
                        data={prodData.product_orders}
                        averageRating={prodData.average_rating}
                        setOpenRatings={setOpenRatings}
                      />
                    ) : (
                      <Details data={prodData?.description} />
                    )}
                  </div>
                </div>
              </div>
              <aside className="prodPreview__aside">
                <div className="delivery">
                  <div className="delivery__header">
                    <h3>Delivery</h3>
                  </div>
                  <div className="delivery__main">
                    <div className="form-group">
                      <label htmlFor="state">Choose a location</label>
                      <div className="delivery__address">
                        <select>
                          <option value="oyo">Oyo</option>
                          <option value="lagos">Lagos</option>
                        </select>
                        <span className="chevron-down-outline">
                          <ion-icon name="chevron-down-outline"></ion-icon>
                        </span>
                      </div>
                      <div className="delivery__address">
                        <select>
                          <option value="oyo">Oyo</option>
                          <option value="lagos">Lagos</option>
                        </select>
                        <span className="chevron-down-outline">
                          <ion-icon name="chevron-down-outline"></ion-icon>
                        </span>
                      </div>
                    </div>
                    <div className="detail">
                      <div className="detail__item">
                        <div className="detail__img">
                          <img src={icon1} alt="something" />
                        </div>
                        <div className="detail__main">
                          <div className="content">
                            <h3>Door Delivery</h3>
                            <p>
                              Delivery{" "}
                              <span className="bold">
                                {currency_formatter(8000)}
                              </span>
                            </p>
                            <p>
                              Delivery is by{" "}
                              <span className="bold">26 May</span> when you
                              order within next{" "}
                              <span className="bold">120hrs 30mins</span>
                            </p>
                          </div>
                          <div className="call-to-action"></div>
                        </div>
                      </div>
                      <div className="detail__item">
                        <div className="detail__img">
                          <img src={icon2} alt="something" />
                        </div>
                        <div className="detail__main">
                          <div className="content">
                            <h3>Pickup</h3>
                            <p>
                              Delivery{" "}
                              <span className="bold">
                                {currency_formatter(0)}
                              </span>
                            </p>
                            <p>
                              Delivery is by{" "}
                              <span className="bold">26 May</span> when you
                              order within next{" "}
                              <span className="bold">120hrs 30mins</span>
                            </p>
                          </div>
                          <div className="call-to-action"></div>
                        </div>
                      </div>
                      <div className="detail__item">
                        <div className="detail__img">
                          <img src={icon3} alt="something" />
                        </div>
                        <div className="detail__main">
                          <div className="content">
                            <h3>Send by Public transport</h3>
                            <p>
                              Delivery{" "}
                              <span className="bold">
                                {currency_formatter(8000)}
                              </span>
                            </p>
                            <p>free return within 48hrs for eligible item</p>
                          </div>
                          <div className="call-to-action"></div>
                        </div>
                      </div>
                      <div className="detail__item">
                        <div className="detail__img">
                          <img src={icon4} alt="something" />
                        </div>
                        <div className="detail__main">
                          <div className="content">
                            <h3>Warranty</h3>
                            <p>
                              Delivery{" "}
                              <span className="bold">
                                {currency_formatter(8000)}
                              </span>
                            </p>
                            <p>free return within 48hrs for eligible item</p>
                          </div>
                          <div className="call-to-action"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="question">
                  <div className="question__body">
                    <p className="question__text">
                      Question about this Product?
                    </p>
                    <div className="chat__btn">
                      <button className="chat__live" id="open_live_chat">
                        Live chat
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
          {similarProd ? (
            <SimilarProduct title="Similar Products" data={similarProd} />
          ) : (
            <div className="similar">
              <h3 className="similar__name">Similar Products</h3>
              <div className="similar__product">
                <div className="similar__pictures">
                  {new Array(6).fill(null).map((_, i) => (
                    <SimilarProductLoader key={i} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <Explore src={explore_banner} />
          <div className="popularAccess">
            <h4 className="accessories">
              <span className="accessories__txt">Popular Accesories</span>
              <span className="hr"></span>
            </h4>
            <div className="wireless">
              <div className="wireless__key">
                {popular?.map((itm, id) => (
                  <div className="wireless__part" key={id}>
                    <div className="wireless__imgWrap">
                      <Link to={`/product-details/${itm.id}`}>
                        <img
                          src={itm.images[0].image_url}
                          alt=""
                          className="wireless__img"
                        />
                      </Link>
                    </div>
                    <div className="wireless__board">
                      <p className="wireless__text">{itm.name}</p>
                      <p className="wireless__price">
                        {currency_formatter(itm.amount)}
                      </p>
                      {carts.some((el) => el.id === itm.id) ? (
                        <button className="add" onClick={() => removeCart(itm)}>
                          Remove
                        </button>
                      ) : null}

                      {!carts.some((el) => el.id === itm.id) &&
                      !itm.is_fixed ? (
                        <Link to={`/product-details/${itm.id}`}>
                          <button className="add">View product</button>
                        </Link>
                      ) : null}

                      {!carts.some((el) => el.id === itm.id) && itm.is_fixed ? (
                        <button
                          className="add"
                          onClick={() => addCartNoVariation(itm)}
                        >
                          Add To Cart
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {openRatings && (
        <AllRatings
          setOpenRatings={setOpenRatings}
          data={prodData.product_orders}
        />
      )}
    </>
  );
};

export default ProductDetails;
