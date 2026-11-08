import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, currency_formatter } from "../libries";
import { useSelector } from "react-redux";

import Empty from "../components/Empty";
import Pagination from "../components/Pagination";

const Reviews = () => {
  const token = useSelector((state) => state.auth.accessToken);

  // state to track loading state
  const [loading, setLoading] = useState(true);

  // state to store all reviews
  const [reviews, setReviews] = useState(null);

  // state to get review id to show its details
  const [reviewProdId, setReviewProdId] = useState(null);

  // state to hold number of items per page
  const [perPage, setPerPage] = useState(null);

  // state to get the last page
  const [lastPage, setLastPage] = useState(null);

  const handleGetReview = (id) => {
    setReviewProdId(reviews.find((review) => review.id === id));
  };

  // state for pagination links
  const [links, setLinks] = useState(null);

  // pagination implementation with the backend functionality
  const [url, setUrl] = useState(`${baseUrl}/all-reviews`);

  // state to keep track of the kind of sort selected
  // const [sort, setSort] = useState("all");

  // state to catch network error
  const [networkError, setNetworkError] = useState(false);

  // showing alert states
  const [alertMsg, setAlertMsg] = useState("");

  // fetching product reviews

  useEffect(() => {
    axios({
      url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        setLoading(false);
        setNetworkError(false);
        if (resp.data.data.products !== null) {
          const reviewsFetched = resp.data.data.products.data;
          const reviewsLinks = resp.data.data.products.meta.links;
          const reviewsPerPage = resp.data.data.products.meta.per_page;
          const reviewsLastPage = resp.data.data.products.meta.last_page;

          setReviews(reviewsFetched);
          setReviewProdId(reviewsFetched[0]);
          setPerPage(reviewsPerPage);
          setLinks(reviewsLinks);
          setLastPage(reviewsLastPage);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === "ERR_BAD_REQUEST") {
          setAlertMsg(err.response.data.message);
        } else {
          setNetworkError(true);
          setAlertMsg(err.message);
        }
      });
  }, [token, url]);

  return (
    <div className="reviews">
      <div className="reviews__head">
        <p>Reviews</p>
        <div className="reviews__search">
          {/* <div className="search__reviews">
              <ion-icon name="search-outline"></ion-icon>
              <input type="text" placeholder="Search reviews" />
            </div> */}

          {/* <div className="filter__reviews">
              <label htmlFor="filter-reviews">Sort by: </label>
              <select name="sort" onChange={handleChangeSort}>
                  <option value="all">All</option>
                  <option value="daily">Today</option>
                  <option value="weekly">This Week</option>
                  <option value="monthly">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom</option>
                </select>
            </div> */}
        </div>
      </div>
      {loading && (
        <div className="loading__spin__address">
          <span className="loader"></span>
        </div>
      )}
      {!loading && !networkError && !reviewProdId && (
        <Empty
          emptyTitle="You have no reviews yet!"
          emptySubTitle=""
          buttonText="Rate a Product"
          link="/dashboard/orders"
        />
      )}

      {!loading && networkError && (
        <Empty
          emptyTitle={alertMsg}
          emptySubTitle="Something went wrong! TRY AGAIN.."
          network={true}
        />
      )}
      {!networkError && reviewProdId && (
        <div className="all__reviews">
          <div className="reviews__list">
            {reviews?.map((review) => (
              <>
                <div
                  key={review.id}
                  className={`${
                    review.id === reviewProdId?.id && "active"
                  } review__item`}
                  onClick={() => handleGetReview(review.id)}
                >
                  <div className="review__item__prod">
                    <div className="prodImg__container">
                      <img
                        src={review.images[0].image_url}
                        alt={review.product.name}
                      />
                    </div>
                    <div className="review__prod">
                      <span className="review__prod__name">
                        {review.product.name}
                      </span>
                      {/* <span>
                            {currency_formatter(review.product.amount)}
                          </span> */}
                      <span>Quantity: {review.quantity}</span>
                    </div>
                  </div>
                  <div className="review__delivery__time">
                    <span>
                      Delivered On{" "}
                      {new Date(review.updated_at).toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* showing review details on mobile like accordion */}
                <div
                  className={`${
                    review.id === reviewProdId?.id
                      ? "show__review__mobile"
                      : "hide__review__mobile"
                  } mobile__review`}
                >
                  <span className="customer__review">
                    {reviewProdId?.caption}
                  </span>
                  <div>
                    {[...Array(5)].map((star, index) => {
                      const showRating = index + 1;
                      return (
                        <span
                          className={`${
                            parseInt(reviewProdId?.rating) >= showRating
                              ? "yellow"
                              : "grey"
                          } star`}
                          key={index}
                        >
                          <ion-icon name="star"></ion-icon>
                        </span>
                      );
                    })}
                  </div>
                  <p>{reviewProdId?.review_details}</p>
                  <div className="review__date">
                    <span>
                      {new Date(review.updated_at).toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="reviews__details">
            <span className="customer__review">{reviewProdId?.caption}</span>
            <div>
              {[...Array(5)].map((star, index) => {
                const showRating = index + 1;
                return (
                  <span
                    className={`${
                      parseInt(reviewProdId?.rating) >= showRating
                        ? "yellow"
                        : "grey"
                    } star`}
                    key={index}
                  >
                    <ion-icon name="star"></ion-icon>
                  </span>
                );
              })}
            </div>
            <p>{reviewProdId?.review_details}</p>
            <div className="review__date">
              <span>
                {new Date(reviewProdId.updated_at).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      )}
      {!loading &&
        (reviews?.length >= perPage || lastPage !== 1) &&
        !networkError && <Pagination links={links} setUrl={setUrl} />}
    </div>
  );
};

export default Reviews;
