import { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";
import {
  baseUrl,
  axiosInstance,
  currency_formatter,
  formatISODateToCustomFormat,
} from "../libries";
import Empty from "./Empty";

// images import
import payment from "../assets/imgs/icons/payment.svg";
import dateoforder from "../assets/imgs/icons/dateoforder.svg";
import orderNumber from "../assets/imgs/icons/orderNumber.svg";
import delivery from "../assets/imgs/icons/delivery.svg";

const RateOrder = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userDetails);

  const [searchParams] = useSearchParams(); // removed setSerachParams since it is used

  const order_code = searchParams.get("order_code");
  const [loading, setLoading] = useState(true);
  const [order_details, setOrder_details] = useState({});
  const [networkError, setNetworkError] = useState(false);

  const orderInfo = [
    {
      color: "orange",
      iconOfOrder: orderNumber,
      orderTrack: "Order Number",
      orderValue: order_details?.order_code,
    },
    {
      color: "grey",
      iconOfOrder: delivery,
      orderTrack: "Delivery method",
      orderValue: order_details?.shipping_method,
    },
    {
      color: "green",
      iconOfOrder: dateoforder,
      orderTrack: "Order Date",
      orderValue: formatISODateToCustomFormat(order_details?.created_at),
    },
    {
      color: "blue",
      iconOfOrder: payment,
      orderTrack: "Payment method",
      orderValue: order_details?.payment?.name,
    },
  ];

  // showing alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [rateOrder, setRateOrder] = useState({
    rating: "",
    user_who_rated: "",
    caption: "",
    review_details: "",
  });

  const [rateHovered, setRateHovered] = useState(null);

  const handleChangeOrderReview = (e) => {
    const { name, value } = e.target;

    setRateOrder({
      ...rateOrder,
      [name]: value,
    });
  };

  useEffect(() => {
    if (token) {
      axiosInstance(token)
        .get(`/orders/single/order/${order_code}`)
        .then((resp) => {
          const orderResp = resp.data.data.orders;
          setOrder_details(orderResp);
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

  const handleSubmitOrderReview = (e) => {
    e.preventDefault();
    console.log(rateOrder);
    axios({
      url: `${baseUrl}/orders/review/${order_details.id}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(rateOrder),
    })
      .then((response) => {
        setRateOrder({
          rating: "",
          user_who_rated: "",
          caption: "",
          review_details: "",
        });
        setAlertStatus("success");
        setAlertMsg(response.data.data.message);
        setShowAlert(true);
      })
      .catch((error) => {
        setAlertStatus("error");
        setAlertMsg(error.response.data.message);
        setShowAlert(true);
      });
  };

  return (
    <>
      <div className="rate__order">
        <DashboardHeader title="Rate Order" isIcon="true" />
        {loading && (
          <div className="loading__spin__address">
            <span className="loader"></span>
          </div>
        )}
        {!loading && networkError && (
          <Empty
            emptyTitle={alertMsg}
            emptySubTitle="Something went wrong! TRY AGAIN.."
            network={true}
          />
        )}
        {!loading && !networkError && (
          <div className="rate__order__container">
            <div className="rate__order__details">
              <div className="cards">
                {orderInfo.map((info, index) => (
                  <OrderCard info={info} key={index} />
                ))}
              </div>
              <div className="order__location">
                <div className="shipping__location">
                  <div className="location__head">
                    <span>Shipping to:</span>
                  </div>
                  <div className="shipping__location__address">
                    <span>
                      <span className="bold">{order_details.address}</span>
                    </span>
                  </div>
                </div>
                <div className="delivery__date">
                  <div className="location__head">
                    <span>Delivery Date:</span>
                  </div>
                  <div className="delivery__date__time">
                    <div className="item__location__address">
                      <span className="bold">
                        {order_details.delivery_time === null
                          ? order_details.shipping_details?.delivery_time
                          : order_details.delivery_time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="total__price">
                  <div className="location__head">
                    <span>Total Price:</span>
                  </div>
                  <div className="total__price__rate">
                    <span>
                      {currency_formatter(order_details.total_amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order__and__review">
              <div className="order__items">
                <div className="order__items__details">
                  {order_details.product_order.map((orderedItem) =>
                    orderedItem.variation === null ? (
                      <div key={orderedItem.id} className="order__list">
                        <div className="order__list__img prodImg__container">
                          <img
                            src={orderedItem.images[0].image_url}
                            alt="ordered item"
                          />
                        </div>
                        <div className="order__list__detail">
                          <div className="order__name__price">
                            <span>{orderedItem.product.name}</span>
                            <span className="price">
                              <s>N</s>
                              {orderedItem.product.amount}
                            </span>
                          </div>
                          <span className="quantity">
                            Quantity: {orderedItem.quantity}
                          </span>
                        </div>
                      </div>
                    ) : (
                      orderedItem.variation.map((withVariation) => (
                        <div key={orderedItem.id} className="order__list">
                          <div className="order__list__img prodImg__container">
                            <img
                              src={orderedItem.images[0].image_url}
                              alt="ordered item"
                            />
                          </div>
                          <div className="order__list__detail">
                            <div className="order__name__price">
                              <span>{orderedItem.product.name}</span>
                              <div>
                                {withVariation.v1 && (
                                  <span>{withVariation.v1} </span>
                                )}
                                {withVariation.v2 && (
                                  <span>, {withVariation.v2} </span>
                                )}
                                {withVariation.v3 && (
                                  <span>, {withVariation.v3} </span>
                                )}
                                {withVariation.v4 && (
                                  <span>, {withVariation.v4} </span>
                                )}
                                {withVariation.v5 && (
                                  <span>, {withVariation.v5} </span>
                                )}
                              </div>
                              <span className="price">
                                {currency_formatter(
                                  withVariation.variation_value.amount
                                )}
                              </span>
                            </div>
                            <span className="quantity">
                              Quantity: {withVariation.variation_value.quantity}
                            </span>
                          </div>
                        </div>
                      ))
                    )
                  )}
                </div>
              </div>
              <div className="leave__review">
                <div className="leave__review__title">Leave A Review</div>
                <form>
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
                              value={rateOrder.rating}
                              onClick={() => {
                                setRateOrder({
                                  ...rateOrder,
                                  rating: currentRating.toString(),
                                });
                              }}
                            />
                            <span
                              className={`${
                                currentRating <=
                                (rateHovered || rateOrder.rating)
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
                    <label htmlFor="">Name</label>
                    <div className="input__radio">
                      <input
                        className="radio__btns"
                        type="radio"
                        id="name"
                        name="user_who_rated"
                        value={user.first_name}
                        checked={
                          rateOrder.user_who_rated === `${user.first_name}`
                        }
                        onChange={handleChangeOrderReview}
                      />
                      <label htmlFor="name" className="form-label">
                        {user.first_name}
                      </label>

                      <input
                        className="radio__btns"
                        type="radio"
                        id="anonymous"
                        name="user_who_rated"
                        value="Anonymous"
                        checked={rateOrder.user_who_rated === "Anonymous"}
                        onChange={handleChangeOrderReview}
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
                      value={rateOrder.caption}
                      onChange={handleChangeOrderReview}
                    />
                  </div>
                  <div className="input__fields">
                    <label htmlFor="details">Review Details</label>
                    <textarea
                      placeholder="Tell us about the product"
                      className="form-input"
                      rows="5"
                      id="details"
                      name="review_details"
                      value={rateOrder.review_details}
                      onChange={handleChangeOrderReview}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="submit__rate__product"
                    onClick={handleSubmitOrderReview}
                  >
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

export default RateOrder;
