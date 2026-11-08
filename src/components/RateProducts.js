import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, axiosInstance, currency_formatter } from "../libries";
import Alert from "./Alert";
import Empty from "./Empty";
import DashboardHeader from "./DashboardHeader";

const RateProducts = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.userDetails);
  const token = useSelector((state) => state.auth.accessToken);

  const [searchParams] = useSearchParams(); // removed setSerachParams since it is used

  const order_code = searchParams.get("order_code");
  const [loading, setLoading] = useState(true);
  const [order_details, setOrder_details] = useState(null);
  const [networkError, setNetworkError] = useState(false);

  // showing alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [rateProduct, setRateProduct] = useState({
    rating: "",
    user_who_rated: "",
    caption: "",
    review_details: "",
  });

  const [rateHovered, setRateHovered] = useState(null);

  const handleChangeProductReview = (e) => {
    const { name, value } = e.target;

    setRateProduct({
      ...rateProduct,
      [name]: value,
    });
  };

  const [showReviewProduct, setShowReviewProduct] = useState(null);

  const handleClickProduct = (prodId) => {
    setShowReviewProduct(
      order_details.find((product) => product.id === prodId)
    );
  };

  useEffect(() => {
    if (token) {
      axiosInstance(token)
        .get(`/product-orders-with-no-review/${order_code}`)
        .then((resp) => {
          const orderResp = resp.data.data.product_order;
          setOrder_details(orderResp);
          setShowReviewProduct(orderResp[0]);
          setLoading(false);
          setNetworkError(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err.code === "ERR_BAD_REQUEST") {
            setAlertMsg(err.response.data.message);
          } else {
            setNetworkError(true);
            setAlertMsg(err.message);
          }
        });
    }
  }, [token, order_code]);

  const handleSubmitProductReview = (e) => {
    e.preventDefault();

    axios({
      url: `${baseUrl}/orders/review/product/${showReviewProduct.id}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(rateProduct),
    })
      .then((resp) => {
        setAlertStatus("success");
        setAlertMsg(resp.data.data.message);
        setShowAlert(true);

        setRateProduct({
          rating: "",
          user_who_rated: "",
          caption: "",
          review_details: "",
        });

        // making another call to fetch unreviewed products
        return axios({
          url: `${baseUrl}/product-orders-with-no-review/${order_code}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((resp) => {
          const orderResp = resp.data.data.product_order;
          setOrder_details(orderResp);
          setShowReviewProduct(orderResp[0]);
          setLoading(false);
          setNetworkError(false);
        });
      })
      .catch((error) => {
        console.log(error);
        setAlertStatus("error");
        setAlertMsg(error.response.data.message);
        setShowAlert(true);
      });
  };

  return (
    <>
      <div className="rate__products">
        <DashboardHeader isIcon="true" title="Rate Products" />
        {loading && (
          <div className="loading__spin__address">
            <span className="loader"></span>
          </div>
        )}
        {!loading &&
          !networkError &&
          order_details &&
          !order_details.length && (
            <Empty
              emptyTitle="You have reviewed all your products"
              buttonText="See All Reviews"
              link="/dashboard/reviews"
            />
          )}
        {!loading && networkError && (
          <Empty
            emptyTitle={alertMsg}
            emptySubTitle="Something went wrong! TRY AGAIN.."
            network={true}
          />
        )}
        {!loading && !networkError && order_details.length > 0 && (
          <div className="all__products">
            <div className="products__list">
              {order_details.map((prodRate) => (
                <div
                  key={prodRate.id}
                  className={`${
                    prodRate.id === showReviewProduct.id && "activeProduct"
                  } product__item`}
                  onClick={() => handleClickProduct(prodRate.id)}
                >
                  <div className="item__rate">
                    <div className="prodImg__container">
                      <img
                        src={prodRate.images[0].image_url}
                        alt={prodRate.product.name}
                      />
                    </div>
                    <div className="product__rate">
                      <span className="product__rate__name">
                        {prodRate.product.name}
                      </span>
                      {/* <span className="product__rate__price">
                        <s>N</s>
                        {prodRate.product.amount}
                      </span> */}
                      <div className="product__rate__price">
                        Quantity:{" "}
                        <span className="qty">{prodRate.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rate__details">
              <div className="item__rate">
                <div className="rate__img">
                  <img
                    src={showReviewProduct.images[0].image_url}
                    alt="product rate"
                  />
                </div>
                <div className="product__rate">
                  <span className="product__rate__name">
                    {showReviewProduct.product.name}
                  </span>
                  {/* <span className="product__rate__price">
                    {currency_formatter(showReviewProduct.product.amount)}
                  </span> */}
                  <div className="product__rate__price">
                    Quantity:{" "}
                    <span className="qty">{showReviewProduct.quantity}</span>
                  </div>
                </div>
              </div>
              <div className="leave__review">
                <div className="leave__review__title">Leave A Review</div>
                <form onSubmit={handleSubmitProductReview}>
                  <>
                    <p>Rate Our Service</p>
                    <div className="rating__order">
                      {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return (
                          <label>
                            <input
                              className="radio__rating"
                              type="radio"
                              name="rating"
                              value={rateProduct.rating}
                              onClick={() => {
                                setRateProduct({
                                  ...rateProduct,
                                  rating: currentRating.toString(),
                                });
                              }}
                            />
                            <span
                              className={`${
                                currentRating <=
                                (rateHovered || rateProduct.rating)
                                  ? "yellow"
                                  : "grey"
                              } star`}
                            >
                              <ion-icon
                                name="star"
                                onMouseEnter={() =>
                                  setRateHovered(currentRating)
                                }
                                onMouseLeave={() => setRateHovered(null)}
                              ></ion-icon>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </>
                  <div className="form__inputs__rate">
                    <label htmlFor="name">Name</label>
                    <div className="input__radio">
                      <input
                        className="radio__btns"
                        type="radio"
                        id="name"
                        value={user.first_name}
                        checked={
                          rateProduct.user_who_rated === `${user.first_name}`
                        }
                        name="user_who_rated"
                        onChange={handleChangeProductReview}
                      />
                      <label htmlFor="name" className="form-label">
                        {user.first_name}
                      </label>

                      <input
                        className="radio__btns"
                        type="radio"
                        id="anonymous"
                        value="Anonymous"
                        checked={rateProduct.user_who_rated === "Anonymous"}
                        name="user_who_rated"
                        onChange={handleChangeProductReview}
                      />
                      <label htmlFor="anonymous" className="form-label">
                        Anonymous
                      </label>
                    </div>
                  </div>
                  <div className="input__fields">
                    <label htmlFor="caption" className="form-label">
                      Caption
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g I love it!"
                      id="caption"
                      name="caption"
                      value={rateProduct.caption}
                      onChange={handleChangeProductReview}
                    />
                  </div>
                  <div className="input__fields">
                    <label htmlFor="review-details">Review Details</label>
                    <textarea
                      placeholder="Tell us about the product"
                      className="form-input"
                      rows="5"
                      id="review-details"
                      value={rateProduct.review_details}
                      name="review_details"
                      onChange={handleChangeProductReview}
                    ></textarea>
                  </div>
                  <button className="submit__rate__product" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      {showAlert && (
        <Alert
          alertMsg={alertMsg}
          alertStatus={alertStatus}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

export default RateProducts;
