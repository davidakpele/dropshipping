import React from "react";
import Product from "./Product";

const Products = ({ title, data, discount, isNew }) => {
  return (
    <div className="contain">
      <div className="home">
        <h3 className="best-deal">{title}</h3>
        <div className="product">
          <div className="product__body">
            {data?.map((itm, id) => (
              <Product data={itm} key={id} discount={discount} isNew={isNew} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
