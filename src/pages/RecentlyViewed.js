import React, { useEffect, useState } from "react";
import { axiosInstance } from "../libries";
import { useDispatch, useSelector } from "react-redux";
import { setViewedItems } from "../store/slices/recentlyViewedSlice";
import Product, { ProductLoader } from "../components/Product";
import Empty from "../components/Empty";

const RecentlyViewed = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.accessToken);
  const { viewed, fetched } = useSelector((state) => state.recentlyViewed);

  // state to track loading state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userToken)
      axiosInstance(userToken)
        // .get(`/saved-products/saved-items`)
        .get(`/products/recently/viewed`)
        .then((resp) => {
          let viewed = resp.data.data.viewed_product;

          console.log(viewed);
          // console.log(viewedx`);
          if (viewed.length)
            viewed.forEach((el) =>
              dispatch(
                setViewedItems({
                  ...el.product,
                  images: el.images,
                })
              )
            );
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
  }, [userToken, fetched, dispatch]);

  return (
    <div className="recentlyViewed">
      <div className="reviews__head">
        <p>Recently Viewed</p>
      </div>
      <div className="product">
        {!loading && viewed && !viewed.length && (
          <Empty emptyTitle="You have no recently viewed product yet!" />
        )}
        <div className="product__body">
          {loading || !viewed
            ? new Array(20).fill(null).map((_, i) => <ProductLoader key={i} />)
            : viewed.length
            ? viewed.map((itm, id) => (
                <Product
                  data={itm}
                  key={itm.id}
                  discount={true}
                  isNew={false}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
