import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../libries";

const CallCenter = () => {
  const [orders, setOrders] = useState([]),
    [logistics, setLogistics] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get(`${baseUrl}/representatives/orders`),
        axios.get(`${baseUrl}/representatives/logistics`),
      ])
      .then((resp) => {
        const [{ data: order }, { data: logistic }] = resp;
        setOrders(order.data.representatives);
        setLogistics(logistic.data.representatives);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="callCenter">
      <div className="contain">
        <h3 className="callCenter__header">
          Reach <span className="text-primary">ShopNig</span> Faster
        </h3>
        <div className="callCenter__wrap">
          <div className="callCenter__orders">
            <h3 className="callCenter__title">Orders</h3>
            {orders.map((itm) => (
              <div className="callCenter__item" key={itm.id}>
                <img src={itm.image_url} alt="customer care" />
                <div>
                  <p className="callCenter__name text-primary">{itm.name}</p>
                  <p>{itm.phone_number}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="callCenter__dispute">
            <h3 className="callCenter__title">Dispute</h3>
            {logistics.map((itm) => (
              <div className="callCenter__item" key={itm.id}>
                <img src={itm.image_url} alt="customer care" />
                <div>
                  <p className="callCenter__name text-primary">{itm.name}</p>
                  <p>{itm.phone_number}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="callCenter__logistics">
            <h3 className="callCenter__title">Logistics</h3>
            {logistics.map((itm) => (
              <div className="callCenter__item" key={itm.id}>
                <img src={itm.image_url} alt="customer care" />
                <div>
                  <p className="callCenter__name text-primary">{itm.name}</p>
                  <p>{itm.phone_number}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="callCenter__HQ">
            <h3 className="callCenter__title">HQ</h3>
            <p>
              AB 15 Albarika complex (Arisekola Market) Bodija, Ibadan, Nigeria
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallCenter;
