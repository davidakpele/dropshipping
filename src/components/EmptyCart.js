import React from "react";

import { Link } from "react-router-dom";

//img
import cart from "../assets/imgs/products/cart.png";

const EmptyCart = ({ name }) => (
  <div className="cart">
    <h3 className="items">Items in shopping cart</h3>
    <div className="cart__troy empty-cart">
      <div className="cart__part empty-cart">
        <div className="cart__img">
          <img src={cart} alt="" className="cart__roll" />
        </div>
        <h3 className="cart__text">Your cart is empty!</h3>
        <p className="cart__browse">
          Browse our categories and discover the best deals
        </p>
        <div className="cart__btn">
          <Link to="/categories">
            <button className="click">All categories</button>
          </Link>
        </div>
      </div>

      <div className="order empty-cart">
        <div className="order__part">
          <h4 className="order__text">ORDER SUMMARY</h4>
          {/* <div className="summary__wrap"> */}
          {/* <div className="summary__order">
            <div className="order__summary">
              <div className="order__details">
                <h3 className="coupon">Coupon code</h3>
              </div>
              <div className="coupon__btn">
                <button className="coupon__code"></button>
              </div>
            </div>
            <div className="order__summary">
              <div className="summary__details">
                <h3 className="coupon">Subtotal</h3>
              </div>
              <div className="coupon__btn">
                <p className="coupon">₦0</p>
              </div>
            </div>
          </div>
          <div className="summary__order">
            <div className="order__summary">
              <div className="order__details">
                <h3 className="coupon">Other processing fee</h3>
              </div>
              <div className="coupon__btn">
                <p className="coupon">₦0</p>
              </div>
            </div>
            <div className="order__summary">
              <div className="summary__details">
                <h3 className="coupon">VAT</h3>
              </div>
              <div className="coupon__btn">
                <button className="coupon">-</button>
              </div>
            </div>
          </div>
          <div className="summary__order">
            <div className="order__summary">
              <div className="order__details">
                <h3 className="coupon">Total</h3>
              </div>
              <div className="coupon__btn">
                <p className="coupon">₦0</p>
              </div>
            </div>
          </div> */}
          <div className="order__summary">
            <div className="order__details">
              <h3 className="coupon__grand">Grand Total</h3>
            </div>
            <div className="coupon__btn">
              <p className="coupon__grand">₦0</p>
            </div>
          </div>

          <div className="order__check">
            <button className="btn-block checkout" disabled>
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EmptyCart;
