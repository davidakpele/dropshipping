import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { Link } from "react-router-dom";
import { currency_formarter } from "../libries";

const Product = ({ data, isNew }) => {
  const { id, name, amount, images, previous_amount } = data;

  return (
    <div className={"product__part" + (isNew ? " product__new" : "")}>
      {previous_amount && (
        <span className="product__discount">
          {Math.floor(((previous_amount - amount) / previous_amount) * 100)} %
        </span>
      )}
      <div className="product__imgWrap">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {images.map((itm, id) => (
            <SwiperSlide key={id}>
              <Link to={`/product-details/${id}`}>
                <img
                  src={itm.image_url}
                  alt="product"
                  className="product__img"
                  key={itm.id}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="product__details">
        <h4 className="product__name">
          <Link to={`/product-details/${id}`}>{name}</Link>
        </h4>
        <p className="product__price">
          {previous_amount && currency_formarter(previous_amount)}
        </p>
        <p className="product__pricee">{currency_formarter(amount)}</p>
      </div>
    </div>
  );
};

export default Product;
