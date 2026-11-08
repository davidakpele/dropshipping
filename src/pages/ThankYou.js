import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Empty from "../components/Empty";
import {
  removeNewAddedDeliveryAddress,
  removeDeliverToAddress,
} from "../store/slices/addressSlice";
import {
  clearCarts,
  resetShippingFee,
  resetTotalOrderPrice,
  resetTotalProduct,
  reset_coupon,
  remove_coupon_amount_percentage,
  remove_new_total_products,
} from "../store/slices/cartSlice";
import { axiosInstance, currency_formatter } from "../libries";
import { useSearchParams } from "react-router-dom";

//component
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import SimilarProduct from "../components/SimilarProduct";

//images
import check from "../assets/imgs/icons/checked-icon.svg";
import checked from "../assets/imgs/icons/checked-dark.svg";
import { useEffect, useState } from "react";

const ThankYou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uiMode = useSelector((state) => state.app.uiMode);
  const userToken = useSelector((state) => state.auth.accessToken);
  const [searchParams] = useSearchParams(); // removed setSearchParams since it is unused
  const order_code = searchParams.get("order_code");
  const [order_details, setOrder_details] = useState({});

  // state to catch network error
  const [networkError, setNetworkError] = useState(false);

  // showing alert states
  const [alertMsg, setAlertMsg] = useState("");

  const [loading, setLoading] = useState(true);

  const handleShowOrderDetails = () => {
    navigate(`/dashboard/orders/orderdetails?order_code=${order_code}`);
  };

  useEffect(() => {
    if (userToken) {
      axiosInstance(userToken)
        .get(`/orders/single/order/${order_code}`)
        .then((resp) => {
          setOrder_details(resp.data.data.orders);

          // adding this to clear items in local storage
          dispatch(clearCarts());
          dispatch(resetShippingFee());

          dispatch(resetTotalProduct());
          dispatch(resetTotalOrderPrice());
          dispatch(removeNewAddedDeliveryAddress());
          dispatch(removeDeliverToAddress());

          dispatch(reset_coupon());
          dispatch(remove_coupon_amount_percentage());
          dispatch(remove_new_total_products());

          setLoading(false);
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
  }, [order_code, userToken, dispatch]);

  return (
    <Layout>
      <Breadcrumb name="Product detail >" />
      <div className="container">
        <div className="thankyou__page">
          <div className="thankyou__part">
            <div className="check__icon">
              <img
                src={uiMode === "light" ? check : checked}
                alt=""
                className="checkedd"
              />
            </div>
            <div className="">
              <h3 className="thanks__text">Thank you for your order</h3>
              <p className="received">
                Your order has been received and is <br />
                processing
              </p>
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
              {!loading && !networkError && order_details && (
                <div className="item__details">
                  <div>
                    <p className="detail__amount">{order_details.order_code}</p>
                    <span className="detail__span">order code</span>
                  </div>
                  <div>
                    <p className="detail__amount">
                      {currency_formatter(order_details.total_amount)}
                    </p>
                    <span className="detail__span">Total Amount</span>
                  </div>
                  <div>
                    <p className="detail__amount">
                      {order_details.product_count}
                    </p>
                    <span className="detail__span">Total Items</span>
                  </div>
                  <div>
                    <p className="detail__amount">
                      {new Date(order_details.created_at).toLocaleDateString(
                        "en-us",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <span className="detail__span">Est. Delivery</span>
                  </div>
                </div>
              )}
            </div>
            {!loading && !networkError && order_details && (
              <div className="see__btn">
                <button
                  className="see__detailss"
                  onClick={handleShowOrderDetails}
                >
                  See Order Details
                </button>
              </div>
            )}
          </div>
        </div>
        <SimilarProduct title="Gadgets you may also like" />
      </div>
    </Layout>
  );
};

export default ThankYou;
