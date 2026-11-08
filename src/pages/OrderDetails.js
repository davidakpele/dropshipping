import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import OrderCard from "../components/OrderCard";
import Processes from "../components/Processes";
import { useSelector } from "react-redux";
import Empty from "../components/Empty";
import { useEffect, useState } from "react";
import {
  currency_formatter,
  formatISODateToCustomFormat,
  axiosInstance,
} from "../libries";

// images import
import payment from "../assets/imgs/icons/payment.svg";
import dateoforder from "../assets/imgs/icons/dateoforder.svg";
import orderNumber from "../assets/imgs/icons/orderNumber.svg";
import delivery from "../assets/imgs/icons/delivery.svg";

const OrderDetails = () => {
  const userToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  // getting order code from url to get show order details page
  const [searchParams, ] = useSearchParams(); // removed setSerachParams since it is used

  const order_code = searchParams.get("order_code");
  const [loading, setLoading] = useState(true);
  const [order_details, setOrder_details] = useState({});

  // state to catch network error
  const [networkError, setNetworkError] = useState(false);

  // showing alert states
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    if (userToken) {
      axiosInstance(userToken)
        .get(`/orders/single/order/${order_code}`)
        .then((resp) => {
          setOrder_details(resp.data.data.orders);
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
  }, [order_code, userToken]);

  const handleRateProducts = () => {
    navigate(`/dashboard/orders/rate-products?order_code=${order_code}`);
  }
  const handleRateOrder = () => {
    navigate(`/dashboard/orders/rate-order/?order_code=${order_code}`);
  }

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

  return (
    <div className="orderdetails">
      <DashboardHeader title="Order details" isIcon="true" />
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
        <div className="orderdetails__info">
          <div className="cards">
            {orderInfo.map((info, index) => (
              <OrderCard info={info} key={index} />
            ))}
          </div>
          <div className="order__location">
            <div className="item__location">
              <div className="location__head">
                <ion-icon name="location-outline"></ion-icon>
                <span>Item Location</span>
              </div>
              <div className="item__location__address">
                <span>
                  <span className="bold">AB 15 Albarika Complex</span>(Arisekola
                  Market) Bodija Ibadan, Nigeria.
                </span>
              </div>
              <div>
                <span className="mail">store@shopnig.com</span>
                <span>
                  +234 810 996 7572,
                  <br /> +234 814 653 7217
                </span>
              </div>
            </div>
            <div className="shipping__location">
              <div className="location__head">
                <ion-icon name="location-outline"></ion-icon>
                <span>Shipping to</span>
              </div>
              <div className="shipping__location__address">
                <span>
                  <span className="bold">{order_details.address}</span>
                </span>
              </div>
              <div>
                <span className="mail"></span>
                <span>{order_details.phone}</span>
              </div>
            </div>
            <div className="delivery__date">
              <div className="location__head">
                <ion-icon name="location-outline"></ion-icon>
                <span>Delivery Date</span>
              </div>
              <div className="delivery__date__time">
                <div className="item__location__address">
                  <span>
                    <span className="bold">Estimated</span>
                    {order_details.delivery_time === null
                      ? order_details.shipping_details?.delivery_time
                      : order_details.delivery_time}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="order__tracking__process">
            {order_details.status !== "CANCELLED" && (
              <Processes orderSteps={order_details.status} />
            )}
            <div className="btns">
              {/* {order_details.status === "PENDING" && (
              <button className="order__btns cancel">Cancel order</button>
            )} */}
              {/* {(order_details.status === "SHIPPED" ||
              order_details.status === "DELIVERED") && (
              <button className="order__btns tracking tracking__active">
                Tracking No: we3rtyuihjoi
              </button>
            )} */}
              {order_details.status === "DELIVERED" && (
                <div className="rate__buttons">
                    <button className="order__btns rate__order" onClick={handleRateProducts}>
                      Rate Products
                    </button>
                    <button className="order__btns rate__products" onClick={handleRateOrder}>
                      Rate order
                    </button>
                </div>
              )}
            </div>
          </div>
          <div className="order__information">
            <div className="all__orders">
              <span>Order Information</span>
            </div>
            <div className="order__info">
              <div className="order__items">
                <div className="order__items__details">
                  {order_details?.product_order.map((orderedItem) =>
                    orderedItem.variation === null ? (
                      <div className="order__list">
                        <div className="prodImg__container order__list__img">
                          <img
                            src={orderedItem.images[0].image_url}
                            alt="ordered item"
                            className="orderList__img"
                          />
                        </div>
                        <div className="order__list__detail">
                          <div className="order__name__price">
                            <span>{orderedItem.product.name}</span>
                            <span className="price">
                              {currency_formatter(orderedItem.product.amount)}
                            </span>
                          </div>
                          <span className="quantity">
                            Quantity: {orderedItem.quantity}
                          </span>
                        </div>
                      </div>
                    ) : (
                      orderedItem.variation.map((withVariatn) => (
                        <div className="order__list">
                          <div className="prodImg__container order__list__img">
                            <img
                              src={orderedItem.images[0].image_url}
                              alt="ordered item"
                              className="orderList__img"
                            />
                          </div>
                          <div className="order__list__detail">
                            <div className="order__name__price">
                              <span>{orderedItem.product.name}</span>
                              <div>
                                {withVariatn.v1 && (
                                  <span>{withVariatn.v1} </span>
                                )}
                                {withVariatn.v2 && (
                                  <span>, {withVariatn.v2} </span>
                                )}
                                {withVariatn.v3 && (
                                  <span>, {withVariatn.v3} </span>
                                )}
                                {withVariatn.v4 && (
                                  <span>, {withVariatn.v4} </span>
                                )}
                                {withVariatn.v5 && (
                                  <span>, {withVariatn.v5} </span>
                                )}
                              </div>
                              <span className="price">
                                {currency_formatter(
                                  withVariatn.variation_value.total_amount
                                )}
                              </span>
                            </div>
                            <span className="quantity">
                              Quantity: {withVariatn.variation_value.quantity}
                            </span>
                          </div>
                        </div>
                      ))
                    )
                  )}
                </div>
              </div>
              <div className="order__price">
                <div className="order__price__list">
                  <div className="order__price__list__title">
                    <span className="price__title">Subtotal</span>
                    <span className="price">
                      {currency_formatter(order_details.sub_total)}
                    </span>
                  </div>
                  <div className="order__price__list__title">
                    <span className="price__title">Shipping fee</span>
                    <span className="price">
                      {currency_formatter(order_details.shipping)}
                    </span>
                  </div>
                  {/* <div className="order__price__list__title">
                  <span className="price__title">Tax</span>
                  <span className="price">
                    <s>N</s>{order_details.tax}
                  </span>
                </div> */}
                </div>
                <div className="order__price__total">
                  <span className="price__title">Order Total</span>
                  <span className="price__total">
                    {currency_formatter(order_details.total_amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
