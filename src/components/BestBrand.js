import { useState, useEffect } from "react";
import { axiosInstance } from "../libries";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setBestBrands } from "../store/slices/cacheSlice";
import Image from "./Image";

const BestBrand = () => {

  const dispatch = useDispatch();

  // getting best brand from global store
  const bestBrands = useSelector((state) => state.cache.bestBrands);

  // declearing data for best-brands
  // const [data, setData] = useState(null);

  useEffect(() => {
    axiosInstance()
      .get(`/brands/best`)
      .then((res) => {
        const bestBrandsResp = res.data.data.product;
        // setData(res.data.data.product);
        dispatch(setBestBrands(bestBrandsResp));
      })
      .catch(console.log);
  }, []);

  return (
    <section className="best-brands">
      <div className="container best-brands__container">
        <h3 className="best-brands__heading">
          Your best brands are on ShopNig
        </h3>
        <div className="best-brands__brands">
          {!bestBrands
            ? new Array(6).fill(null).map((_, i) => (
                <div className="best-brands__brand" key={i}>
                  <div className="best-brands__brand-img placeholder"></div>
                </div>
              ))
            : bestBrands.map((itm) => (
                <div className="best-brands__brand" key={itm.id}>
                  <Link to={`/categories?brand=${itm.id}`}>
                    <Image
                      src={itm.image_url}
                      alt=""
                      className="best-brands__brand-img"
                    />
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default BestBrand;
