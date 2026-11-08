import React from "react";
import { Link } from "react-router-dom";

const CategoryCardItem = ({ src, data }) => (
  <div className="category__prodCard">
    <div className="categroy__prodImgWrap">
      <Link to="/product-details">
        <img src={src} alt="imgs" className="caregory__prodImg" />
      </Link>
    </div>
    <div className="category__prodCardBody">
      <div className="category__wishlist">
        <span className="tag tag--green">{data.tag}</span>
        {1 ? (
          <ion-icon className="heart" name="heart"></ion-icon>
        ) : (
          <ion-icon className="heart-outline" name="heart-outline"></ion-icon>
        )}
      </div>
      <h3 className="category__prodName">
        <Link to="/product-details">{data.name}</Link>
      </h3>
      <p className="discount">
        <span className="discount__price">{data.discountPrice}</span>{" "}
        <span className="tag tag--red">-{data.discount}%</span>
      </p>
      <p className="price">{data.actualPrice}</p>
      <button className="btn btn-primary btn-block">Add to cart</button>
    </div>
  </div>
);

export default CategoryCardItem;
