import { useDispatch, useSelector } from "react-redux";
import Empty from "../components/Empty";
import { ProductLoader } from "../components/Product";

//component
import ProdCategory from "../components/prodCategory";
import { useEffect } from "react";
import { axiosInstance } from "../libries";
import { useState } from "react";
import { saveItem } from "../store/slices/savedItemSlice";

const SavedItems = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.accessToken);
  const products = useSelector((state) => state.savedItems.items);

  // state to track loading state
  const [loading, setLoading] = useState(true);

  // state to catch network error
  const [networkError, setNetworkError] = useState(false);

  // showing alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    if (userToken)
      axiosInstance(userToken)
        .get(`/saved-products/saved-items`)
        .then((resp) => {
          let saves = resp.data.data.saved_products;

          if (saves.length)
            saves.forEach((el) =>
              dispatch(
                saveItem({
                  ...el.product,
                  discount: el.product.percentage_discount,
                  brand: "samsung",
                  images: el.images,
                })
              )
            );
        })
        .catch((err) => {
          setAlertStatus("error");
          if (err.code === "ERR_BAD_REQUEST") {
            setAlertMsg(err.response.data.message);
          } else {
            setNetworkError(true);
            setAlertMsg(err.message);
          }
          setShowAlert(true);
        })
        .finally(() => setLoading(false));
  }, [userToken, dispatch]);

  return (
    <div className="my__wallet">
      <div className="my__wallet__content">
        <div className="saved__items">
          <div className="reviews__head">
            <p>
              Saved Items
              <span className="saved__text">
                (Saved items can be stored for a max of 60 days.)
              </span>
            </p>
            {/* <div className="reviews__search">
              <div className="search__reviews">
                <ion-icon name="search-outline"></ion-icon>
                <input type="text" placeholder="Search saved items" />
              </div>
              <div className="filter__reviews">
                <label htmlFor="filter-reviews">Sort by: </label>
                <select id="filter-reviews">
                  <option value="">Most Recent</option>
                  <option value="">[low - high]</option>
                  <option value="">[high - low]</option>
                </select>
              </div>
            </div> */}
          </div>
          <div className="category__main">
            <div>
              {!loading && !networkError && products && !products.length && (
                <Empty
                  emptyTitle="You have no saved items yet!"
                  emptySubTitle=""
                  buttonText="All Categories"
                  link="/categories"
                />
              )}
              {!loading && networkError && (
                <Empty
                  emptyTitle={alertMsg}
                  emptySubTitle="Something went wrong! TRY AGAIN.."
                  network={true}
                />
              )}
              <div className="category__products">
                {!networkError && loading
                  ? new Array(15)
                      .fill(null)
                      .map((_, i) => <ProductLoader key={i} />)
                  : products.length
                  ? !networkError && products?.map((itm, index) => (
                      <ProdCategory
                        data={itm}
                        key={index}
                        setCartMessage={setAlertMsg}
                        setCartStatus={setAlertStatus}
                        setShowCartNotify={setShowAlert}
                      />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedItems;
