import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance, currency_formatter } from "../libries";
import {
  setTotalOrderPrice,
  set_coupon,
  set_total_prods,
  set_coupon_amount_percentage,
  remove_coupon_amount_percentage,
  set_new_total_products,
  remove_new_total_products,
  resetShippingFee,
  reset_coupon,
  resetTotalOrderPrice,
  resetTotalProduct,
} from "../store/slices/cartSlice";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const OrderSummary = ({
  shippingMtdCode,
  click,
  placeAnOrderRef,
  makingOrder,
  paymentMtd,
  balAbleToOrder
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useSearchParams();
  const cancled = msg.get("message");

  const [errMsg, setErrMsg] = useState("");

  const [loading, setLoading] = useState(false);

  // the coupon code saves here
  const [coupon, setCoupon] = useState("");

  const userToken = useSelector((state) => state.auth.accessToken);

  const {
    carts,
    totalOrderFee,
    shippingFee,
    coupon_amount_percent,
    total_products,
    new_total_products,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!carts.length) {
      // adding resetting total of product and total of order here if cart is empty
      dispatch(resetTotalProduct());
      dispatch(resetTotalOrderPrice());
    }

    // calculates the total product from cart
    let totalProductSum = carts
      .map((itm) => {
        if (itm.variation_info?.length)
          return itm.variation_info.reduce(
            (curr, { total }) => curr + total,
            0
          );
        else return itm.total;
      })
      .reduce((itm, val) => itm + val, 0);

    dispatch(set_total_prods(totalProductSum));
    // }
  }, [carts, dispatch, coupon_amount_percent]);

  // setting a useEffect here to reset shipping fee to default if cart changes
  useEffect(() => {
    dispatch(resetShippingFee());
  }, [carts, dispatch]);

  useEffect(() => {
    if (!shippingFee && !coupon_amount_percent)
      dispatch(setTotalOrderPrice(Number(total_products)));
    else if (shippingFee && coupon_amount_percent)
      dispatch(setTotalOrderPrice(new_total_products + Number(shippingFee)));
    else if (!shippingFee && coupon_amount_percent)
      dispatch(setTotalOrderPrice(new_total_products));
    else
      dispatch(
        setTotalOrderPrice(Number(total_products) + Number(shippingFee))
      );
  }, [
    dispatch,
    shippingFee,
    total_products,
    coupon_amount_percent,
    new_total_products,
  ]);

  const handleEditCart = () => {
    dispatch(resetShippingFee());
    dispatch(reset_coupon());
    dispatch(resetTotalOrderPrice());
    dispatch(resetTotalProduct());
    dispatch(remove_coupon_amount_percentage());
    dispatch(remove_new_total_products());
    navigate("/cart");
  };

  const get_coupon = (data, coupon) => {
    setErrMsg("");
    setLoading(true);
    dispatch(set_coupon(coupon));

    const filtered = data.map((itm) => {
      if (itm.variation_info?.length)
        return {
          product_id: itm.id,
          variation: itm.variation_info.map((itms) => ({
            id: itms.id,
            quantity: itms.quantity,
          })),
        };
      else
        return {
          product_id: itm.id,
          quantity: itm.quantity,
        };
    });

    axiosInstance(userToken)
      .post("/orders/get-order-coupon", {
        product_orders: filtered,
        coupon_code: coupon,
      })
      .then((resp) => {
        dispatch(set_new_total_products(resp.data.new_amount));

        dispatch(
          set_coupon_amount_percentage({
            amount: resp.data.coupon_amount,
            percentage: Math.floor(resp.data.coupon),
          })
        );
      })
      .catch((err) => {
        const resp = err?.response.data;
        !resp?.status && setErrMsg(resp.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="checkout__summary">
      <div className="">
        <div className="checkout__head">
          <div>
            <h2 className="orderr">ORDER SUMMARY</h2>
          </div>
          <p className="edit" onClick={handleEditCart}>
            Edit Cart
          </p>
        </div>
        <div className="checkout__page">
          {carts?.map((cartItem) =>
            !cartItem.variation_info?.length ? (
              <div className="detailed" key={cartItem.id}>
                <div>
                  <img
                    src={cartItem.src.image_url}
                    alt="products"
                    className="canon-img"
                  />
                </div>
                <div>
                  <h5 className="detailed__name">{cartItem.name}</h5>
                  <p className="detailed__price">
                    {currency_formatter(cartItem.total)}
                  </p>
                  <p className="detailed__quantity">
                    <span className="quan ">Quantity:</span>
                    {cartItem.quantity}
                  </p>
                </div>
              </div>
            ) : (
              <React.Fragment>
                {cartItem?.variation_info.map((itm, i) => (
                  <div className="detailed" key={i}>
                    <div>
                      <img
                        src={cartItem.src.image_url}
                        alt="products"
                        className="canon-img"
                      />
                    </div>
                    <div>
                      <h5 className="detailed__name">
                        {cartItem.name +
                          " " +
                          itm?.variations.map((el) => el).join(", ")}
                      </h5>
                      <p className="detailed__price">
                        {currency_formatter(itm.total)}
                      </p>
                      <p className="detailed__quantity">
                        <span className="quan ">Quantity:</span>
                        {itm.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            )
          )}
          <div className="checkout__total">
            <div className="total__prices">
              <div className="">
                <h5 className="subtotal">Subtotal</h5>
              </div>
              <div>
                <p className="amount">{currency_formatter(total_products)}</p>
              </div>
            </div>
            <div className="total__prices">
              <div className="">
                <h5 className="subtotal">Shipping</h5>
              </div>
              <div>
                <p className="amount">
                  {!carts.length
                    ? currency_formatter(0)
                    : currency_formatter(shippingFee)}
                </p>
              </div>
            </div>
            {coupon_amount_percent && (
              <div className="total__prices">
                <div className="">
                  <h5 className="subtotal text-green">
                    Discount ({coupon_amount_percent.percentage}%):
                  </h5>
                </div>
                <div>
                  <p className="amount text-green">
                    - {currency_formatter(coupon_amount_percent.amount)}
                  </p>
                </div>
              </div>
            )}
            {!coupon_amount_percent && (
              <div className="total__prices">
                <div className="">
                  <h5 className="subtotal">Coupon</h5>
                </div>
                <div className="progress">
                  <div className="coupon_code">
                    <input
                      type="text"
                      name="coupon_code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="please input you coupon"
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => get_coupon(carts, coupon)}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <ion-icon name="checkmark-outline"></ion-icon>
                      )}
                    </button>
                  </div>
                  {errMsg && <p className="text-danger">{errMsg}</p>}
                </div>
              </div>
            )}
          </div>
          <div className="checkout__totals">
            <div className="totals__pricess">
              <div className="">
                <h5 className="subtotals">Total</h5>
              </div>
              <div>
                <p className="amounts">{currency_formatter(totalOrderFee)}</p>
              </div>
            </div>
            <div className="pay__btn">
              {cancled && <p className="text-danger mb-half">{cancled}</p>}
              {shippingMtdCode && paymentMtd === "pay-on-pickup" ? (
                <button
                  className={`pay ${makingOrder ? "disablePay" : ""}`}
                  onClick={click}
                  ref={placeAnOrderRef}
                >
                  Proceed to Pay On PickUp
                </button>
              ) : balAbleToOrder ? (
                <button
                  className={`pay ${makingOrder ? "disablePay" : ""}`}
                  onClick={click}
                  ref={placeAnOrderRef}
                >
                  {`Proceed to Pay 
                    ${currency_formatter(totalOrderFee)}`}
                </button>
              ) : (
                <button className="btn btn-grey btn-block disablePay" disabled>
                  Proceed to Pay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
