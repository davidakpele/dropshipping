import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClickedOrderId } from "../store/slices/orderSlice";

// import images
import whatsapp from "../assets/imgs/icons/whatsapp.svg";
import { currency_formatter } from "../libries";
import { useState } from "react";

const OrderedItem = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleShowOrderDetails = (order_code) => {
    navigate(`/dashboard/orders/orderdetails?order_code=${order_code}`);
  };


  return (
    <div
      className={`${
        order.status === "PENDING"
          ? "pending"
          : order.status === "PROCESSING"
          ? "processing"
          : order.status === "SHIPPED"
          ? "shipped"
          : order.status === "DELIVERED"
          ? "delivered"
          : "cancelled"
      } ordered__item`}
      key={order.id}
    >
      <div
        className="ordered__item__info"
      >
          <div onClick={ () => handleShowOrderDetails(order.order_code)}>
            <div className="order__detail">
              <span className="order__headline">Order ID:</span>
              <span>{order.order_code}</span>
            </div>
            <div className="order__detail">
              <span className="order__headline">Qty:</span>
              <span>{order.product_count}</span>
            </div>
            <div className="order__detail">
              <span className="order__headline">Price:</span>
              <span className="order__price">
                {currency_formatter(order.total_amount)}
              </span>
            </div>
            <div className="order__detail">
              <span className="order__headline">Tracking no:</span>
              <span>{order.order_code}</span>
            </div>
            <div className="order__detail status__order">
              <span className="order__headline">Status:</span>
              <span>{order.status}</span>
            </div>
          </div>
        <a href={order.whatsapp_url} target="_blank" rel="noreferrer" className="chat__link">
          <div className="order__detail chat__with__us left">
            <img src={whatsapp} alt="chat with us" />
            <span className="margin__left__chat">Chat us</span>
          </div>
        </a>
      </div>
      <div className="ordered__item__tracking">
        <span className="order__headline">{order.created_at.slice(0, 10)}</span>
        {order.coupon && (
          <div className="order__detail">
            <span className="order__headline">Coupon:</span>
            <span>{order.coupon}</span>
          </div>
        )}
        <a href={order.whatsapp_url} target="_blank" rel="noreferrer" className="chat__link">
          <div className="order__detail chat__with__us">
            <img src={whatsapp} alt="chat with us" /><span className="margin__left__chat">Chat us</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default OrderedItem;

export const OrderedItemLoading = () => {
  return <div className={` ordered__item placeholder`}></div>;
};
