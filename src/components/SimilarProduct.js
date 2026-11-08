import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { baseUrl, currency_formatter } from "../libries";

const SimilarProduct = ({ title }) => {
  const [gadgets, setGadgets] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/likeable-products`)
      .then((resp) => {
        setGadgets(resp.data.data.likeable_products);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="similar">
      <h3 className="similar__name">{title}</h3>
      <div className="similar__product">
        <div className="similar__pictures">
          {gadgets?.map((itm) => (
            <div className="similar__part" key={itm.id}>
              <div className="similar__imgWrap">
                {itm.discount ? (
                  <span className="product-card__discount">
                    {`${Math.floor(itm.discount)}%`}
                  </span>
                ) : (
                  ""
                )}
                <Link to={`/product-details/${itm.id}`}>
                  <img
                    src={itm.images[0].image_url}
                    alt=""
                    className="product__img"
                  />
                </Link>
              </div>
              <div className="products">
                <h4 className="products__name">
                  <Link to={`/product-details/${itm.id}`}>{itm.name}</Link>
                </h4>
                <p className="products__price">{currency_formatter(535000)}</p>
                <p className="products__prices">
                  {currency_formatter(itm.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SimilarProductLoader = () => {
  return (
    <div className="similar__part">
      <div className="similar__imgWrap placeholder">
        <span className="similar__discount placeholder">none</span>
      </div>
      <div className="products">
        <h4 className="products__name placeholder mb-1">itm.name</h4>
        <p className="products__prices placeholder">price</p>
      </div>
    </div>
  );
};

export default SimilarProduct;
