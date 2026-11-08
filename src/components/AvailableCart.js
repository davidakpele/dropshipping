import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartQuantity,
  removeCartQuantiy,
  removeCartItem,
} from "../store/slices/cartSlice";
import { axiosInstance, currency_formatter } from "../libries";

const AvailableCart = ({ data }) => {
  const dispatch = useDispatch();
  const usertoken = useSelector((state) => state.auth.accessToken);
  const cart = useSelector((state) => state.cart.carts);
  let total = cart.map((itm) => {
    if (itm.variation_info?.length) {
      return itm.variation_info.reduce((sum, el) => sum + el.total, 0);
    } else return itm.total;
  });

  const addQuantity = (id, var_id) => {
    dispatch(addCartQuantity({ ...id, variation_id: var_id }));
  };

  const removeQuantity = (id, var_id) => {
    dispatch(removeCartQuantiy({ ...id, variation_id: var_id }));
  };

  const removeCart = (id, var_id) => {
    dispatch(removeCartItem({ ...id, variation_id: var_id }));

    if (usertoken)
      axiosInstance(usertoken)
        .post("/carts/remove", {
          product_id: id.id,
        })
        .then((resp) => {
          if (resp.data.status) {
            console.log(resp.data.message);
            dispatch(removeCartItem({ ...id, variation_id: var_id }));
          }
        })
        .catch((err) => console.error(err.response.data.message));
    else dispatch(removeCartItem({ ...id, variation_id: var_id }));
  };

  // console.log(data);
  return (
    <div className="cart">
      <h3 className="items">Items in shopping cart</h3>
      {/* <div className="cart__itmms cart__header">
        <div className="cart__itmm">
          <div className="cart__prod">
            <p className="product__text">Product</p>
          </div>
          <div className="cart__quality">
            <div className="cart__price">
              <p className="product__text">Price</p>
            </div>
            <div className="cart__quantity">
              <p className="product__text">Quantity</p>
            </div>
            <div className="cart__total">
              <p className="product__text">Total</p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="cart__troy">
        <div className="cart__itms">
          {data.map((itm, id) =>
            !itm.variation_info?.length ? (
              <div className="cart__itm placholder" key={id}>
                <div className="cart__prod">
                  <div className="imgWrap">
                    <Link to={`/product-details/${itm.id}`}>
                      <img src={itm.src.image_url} alt="crt" />
                    </Link>
                  </div>
                  <div className="imgCaption">
                    <h3 className="cap__name">{itm.name}</h3>
                    <p className="cap__type">
                      {itm.color} &nbsp;&nbsp;&nbsp;
                      <span className="typee">{itm.brand}</span>
                    </p>
                  </div>
                </div>
                <div className="cart__qualities">
                  <div className="cart__price">
                    <p className="price__text">
                      {currency_formatter(itm.price)}
                    </p>
                  </div>
                  <div className="cart__quantity">
                    <div className="quan__control">
                      <button
                        className="subtract__btn"
                        onClick={() => removeQuantity(itm)}
                      >
                        -
                      </button>
                      <div>
                        <span className="price__text">{itm.quantity} </span>
                      </div>
                      <button
                        className="add__btn"
                        onClick={() => addQuantity(itm)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart__total">
                    <p className="price__text">
                      {currency_formatter(itm.total)}
                    </p>
                  </div>
                  <div className="cart__del">
                    <button
                      className="cancel__btn"
                      onClick={() => removeCart(itm)}
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <React.Fragment key={id}>
                {itm.variation_info.map((varInfo, i) => (
                  <div className="cart__itm placholder" key={i}>
                    <div className="cart__prod">
                      <div className="imgWrap">
                        <Link to={`/product-details/${itm.id}`}>
                          <img src={itm.src.image_url} alt="crt" />
                        </Link>
                      </div>
                      <div className="imgCaption">
                        <h3 className="cap__name">{itm.name}</h3>
                        {varInfo.variations.length
                          ? varInfo.variations.map((itm, id) => (
                              <React.Fragment key={id}>
                                <p className="cap__type">
                                  <span className="typee">{itm}</span>
                                </p>
                              </React.Fragment>
                            ))
                          : null}
                      </div>
                    </div>
                    <div className="cart__qualities">
                      <div className="cart__price">
                        <p className="price__text">
                          {currency_formatter(varInfo.amount)}
                        </p>
                      </div>
                      <div className="cart__quantity">
                        <div className="quan__control">
                          <button
                            className="subtract__btn"
                            onClick={() => removeQuantity(itm, varInfo.id)}
                          >
                            -
                          </button>
                          <div>
                            {/* {console.log(varInfo)} */}
                            <span className="price__text">
                              {varInfo.quantity}
                            </span>
                          </div>
                          <button
                            className="add__btn"
                            onClick={() => addQuantity(itm, varInfo.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="cart__total">
                        <p className="price__text">
                          {currency_formatter(
                            varInfo.quantity * varInfo.amount
                          )}
                        </p>
                      </div>
                      <div className="cart__del">
                        <button
                          className="cancel__btn"
                          onClick={() => removeCart(itm, varInfo.id)}
                        >
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            )
          )}
        </div>
        <div className="order">
          <div className="order__part">
            <h4 className="order__text">ORDER SUMMARY</h4>
            <div className="summary__order">
              <div className="order__summary">
                <div className="summary__details">
                  <h3 className="coupon">Subtotal</h3>
                </div>
                <div className="coupon__btn">
                  <p className="coupon">
                    {currency_formatter(
                      total.reduce((curr, val) => curr + val, 0)
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="summary__order">
              <div className="order__summary">
                <div className="order__details">
                  <h3 className="coupon">Total</h3>
                </div>
                <div className="coupon__btn">
                  <p className="coupon">
                    {currency_formatter(
                      total.reduce((curr, val) => curr + val, 0)
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="order__summary">
              <div className="order__details">
                <h3 className="coupon__grand">Grand Total</h3>
              </div>
              <div className="coupon__btn">
                <p className="coupon__grand">
                  {currency_formatter(
                    total.reduce((curr, val) => curr + val, 0)
                  )}
                </p>
              </div>
            </div>
            <div className="order__check">
              <Link to="/checkout">
                <button className="checkoutt">CHECKOUT</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableCart;
