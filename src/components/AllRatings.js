// import { useState } from "react";

const AllRating = ({ setOpenRatings, data }) => {
  return (
    <div id="overflow-contain" className="show__available__address">
      <div className="available__address">
        <div className="add__pad__available">
          <div className="available__address__sticky">
            <ion-icon
              onClick={() => setOpenRatings(false)}
              name="close-circle-outline"
            ></ion-icon>
            <div className="address__title">
              {/* <h3>Customer's Review</h3> */}
              <h3>Customer's Review ({data.length})</h3>
            </div>
          </div>
          <div className="all__ratings">
            <div className="customer__review">
              {data?.map((itm, id) => (
                <div className="customer__comment" key={id}>
                  {[...Array(5)].map((star, index) => {
                    const showRating = index + 1;
                    return (
                      <span
                        className={`${
                          parseInt(itm?.rating) >= showRating
                            ? "yellow"
                            : "grey"
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
      </div>
    </div>
  );
};

export default AllRating;
