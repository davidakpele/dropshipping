import { axiosInstance, currency_formatter } from "../libries";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

//component
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import SimilarProduct from "../components/SimilarProduct";

//images
import incompleteTrans from "../assets/imgs/icons/incompleteTrans.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store/slices/orderSlice";

const ReturnToError = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [order_details, setOrder_details] = useState();
  // const [order, setOrders] = useState();
  const [is_loading, setLoading] = useState(false);
  const order_code = searchParams.get("order_code");
  const userToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    setLoading(true);
    if (userToken) {
      axiosInstance(userToken)
        .get(`/orders/single-order/${order_code}`)
        .then((resp) => {
          setOrder_details(resp.data.data.orders);

          // making another request to fetch all orders
          return axiosInstance(userToken)
            .get(`/orders`)
            .then((resp) => {
              const ordersFetched = resp.data.data.orders.data;
              dispatch(setOrders(ordersFetched));
            });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        })
        .finally(() => setLoading(false));
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
                src={incompleteTrans}
                alt=""
                className="incomplete transactions"
              />
            </div>
            <div className="">
              <h3 className="incomplete__text">Incomplete Transaction</h3>
              <p className="received">
                Your order failed to process, kindly go back to try again.
              </p>
              {is_loading && !order_details && (
                <div className="loading__spin__address">
                  <span className="loader"></span>
                </div>
              )}
              {!is_loading && order_details && (
                <div className="item__incomplete">
                  <div>
                    <p className="detail__amount">
                      {order_details?.order_code}
                    </p>
                    <span className="detail__span">order code</span>
                  </div>
                  <div>
                    <p className="detail__amount">
                      {currency_formatter(order_details?.sub_total)}
                    </p>
                    <span className="detail__span">Total Amount</span>
                  </div>
                  <div>
                    <p className="detail__amount">
                      {order_details?.product_count}
                    </p>
                    <span className="detail__span">Total Items</span>
                  </div>
                </div>
              )}
            </div>
            {!is_loading && order_details && (
              <div className="see__btn">
                <button
                  className="see__detailss"
                  onClick={() =>
                    navigate(
                      `/dashboard/orders/orderdetails?order_code=${order_code}`
                    )
                  }
                >
                  Go To Order
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

export default ReturnToError;
