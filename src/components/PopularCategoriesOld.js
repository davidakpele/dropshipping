import React from "react";
import { Link } from "react-router-dom";

const PopularCategories = ({ data }) => {
  return (
    <div className="contain">
      <div className="popular">
        <h4 className="popular__categories">Popular Categories</h4>
        <div className="popular__items">
          <div className="popular__brands">
            {data.map((itm) => (
              <div className="popular__name" key={itm.id}>
                <Link to="/categories">
                  <img src={itm.image_url} alt="" className="popular__img" />
                </Link>
                <p>{itm.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
