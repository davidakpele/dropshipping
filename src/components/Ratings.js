// import { useState } from "react";
// import AllRatings from "../components/AllRatings";

const Ratings = ({ data, averageRating, setOpenRatings }) => {
  if (data.length > 0 && averageRating !== 0) {
    return (
      <div className="verified">
        <div className="verified__page">
          <div className="verified__rating">
            <h4 className="verified__text">VERIFIED RATING</h4>
            <div className="verified__rate">
              <h3 className="verified__fig">{Math.round(averageRating)}/5</h3>
              {[...Array(5)].map((star, index) => {
                const showRating = index + 1;
                return (
                  <span
                    className={`${
                      parseInt(Math.round(averageRating)) >= showRating
                        ? "yellow"
                        : "grey"
                    } starProd`}
                    key={index}
                  >
                    <ion-icon name="star"></ion-icon>
                  </span>
                );
              })}
            </div>
          </div>
          <div className="rating">
            <div className="rating__page">
              <h4 className="figure">5</h4>
              <p className="figure__icon">
                <ion-icon name="star"></ion-icon>
              </p>
              <div className="progress">
                <div className="progress__bar"></div>
              </div>
            </div>

            <div className="rating__page">
              <h4 className="figure">4</h4>
              <p className="figure__icon">
                <ion-icon name="star"></ion-icon>
              </p>
              <div className="progress">
                <div className="progress__bar2"></div>
              </div>
            </div>

            <div className="rating__page">
              <h4 className="figure">3</h4>
              <p className="figure__icon">
                <ion-icon name="star"></ion-icon>
              </p>
              <div className="progress">
                <div className="progress__bar3"></div>
              </div>
            </div>

            <div className="rating__page">
              <h4 className="figure">2</h4>
              <p className="figure__icon">
                <ion-icon name="star"></ion-icon>
              </p>
              <div className="progress">
                <div className="progress__bar4"></div>
              </div>
            </div>

            <div className="rating__page">
              <h4 className="figure">1</h4>
              <p className="figure__icon">
                <ion-icon name="star"></ion-icon>
              </p>
              <div className="progress">
                <div className="progress__bar5"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="customer">
          <div className="customer__text">
            <h4>Customer's Review ({data.length})</h4>
            <span
              className="see__all__rating"
              onClick={() => setOpenRatings(true)}
            >
              see all ratings
            </span>
            {/* <h4>Customer's Review ({data.length})</h4> */}
            {/* <span className="see__all__rating">see all ratings</span> */}
          </div>
          <div className="customer__review">
            {data?.slice(0, 10).map((itm, id) => (
              <div className="customer__comment" key={id}>
                {[...Array(5)].map((star, index) => {
                  const showRating = index + 1;
                  return (
                    <span
                      className={`${
                        parseInt(itm?.rating) >= showRating ? "yellow" : "grey"
                      } starProd`}
                      key={index}
                    >
                      <ion-icon name="star"></ion-icon>
                    </span>
                  );
                })}
                <p className="customer__view">{itm.review_details}</p>
                <p className="customer__name">
                  {`${new Date(itm.updated_at).getFullYear()}-${new Date(
                    itm.updated_at
                  ).getMonth()}-${new Date(itm.updated_at).getDay()}`}{" "}
                  by {itm.user_who_rated}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="verified">
        <p style={{ fontSize: "1.6rem" }}>No review for product yet!</p>
      </div>
    );
  }
};

export default Ratings;
