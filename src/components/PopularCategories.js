import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const PopularCategories = ({ data }) => {
  return (
    <section className="popular-categories">
      <div className="popular-categories__container">
        <div className="popular-categories__header">
          <span>Popular Categories</span>
          <Link to="/categories" className="see__all__cat">
            See all Categories
          </Link>
        </div>
        <div className="popular-categories__categories">
          {!data
            ? new Array(6).fill(null).map((_, i) => (
                <div className="popular-categories__category" key={i}>
                  <div className="popular-categories__category-img br-50 placeholder"></div>
                  <p className="popular-categories__category-name">
                    <span className="placeholder">Monitor</span>
                  </p>
                </div>
              ))
            : data.map((itm) => (
                <div className="popular-categories__category" key={itm.id}>
                  <Link to={`/categories?categories=${itm.category_id}`}>
                    <Image
                      src={itm.image_url}
                      className="popular-categories__category-img"
                      ldClassName="popular-categories__category-img br-50"
                      alt=""
                    />
                  </Link>
                  <p className="popular-categories__category-name">
                    {itm.name}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
