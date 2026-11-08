import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCartItem, removeCartItem } from "../store/slices/cartSlice";
import { axiosInstance, currency_formatter } from "../libries";
import { saveItem, removeSavedItem } from "../store/slices/savedItemSlice";

const ProdCategory = ({
  data,
  setCartMessage,
  setCartStatus,
  setShowCartNotify,
}) => {
  const {
    id,
    amount,
    name,
    color,
    discount,
    brand,
    is_fixed,
    previous_amount,
    images: [image],
  } = data;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartsLocal = useSelector((state) => state.cart.carts);
  const savedItems = useSelector((state) => state.savedItems.items);
  const usertoken = useSelector((state) => state.auth.accessToken);

  const addCart = (item) => {    
    dispatch(addCartItem(item));

    if (usertoken)
      axiosInstance(usertoken)
        .post("/carts/add", {
          carts: [
            {
              product_id: item.id,
              quantity: 1,
            },
          ],
        })
        .then((resp) => resp.data.status && dispatch(addCartItem(item)))
        .catch((err) => {
          return err.response;
        });
    else dispatch(addCartItem(item));

    // trying to set the notification for adding to cart here
    setCartStatus("success");
    setCartMessage("Product successfully added to cart");
    setShowCartNotify(true);
  };

  const removeCart = (item) => {
    dispatch(removeCartItem(item));

    if (usertoken)
      axiosInstance(usertoken)
        .post("/carts/remove", {
          product_id: item.id,
        })
        .then((resp) => resp.data.status && dispatch(removeCartItem(item)))
        .catch((err) => {
          return err.response;
        });
    else dispatch(removeCartItem(item));

    // trying to set the notification for removing to cart here'
    setCartStatus("error");
    setCartMessage("Product successfully removed to cart");
    setShowCartNotify(true);
  };

  const addWhitelist = (item) => {
    if (usertoken) {
      dispatch(saveItem(item));
      if (usertoken)
        axiosInstance(usertoken)
          .post("/saved-products/saved-items", {
            products_id: [{ id: item.id }],
          })
          .then((resp) => resp.data.status && dispatch(saveItem(item)))
          .catch(console.error);
      else dispatch(saveItem(item));
    } else navigate("/login");
  };

  const removeWhitelist = (id) => {
    if (usertoken) {
      dispatch(removeSavedItem(id));
      if (usertoken)
        axiosInstance(usertoken)
          .post("/products/remove/saved", { product_id: id })
          .then((resp) => resp.data.status && dispatch(removeSavedItem(id)))
          .catch(console.error);
      else dispatch(removeSavedItem(id));
    } else navigate("/login");
  };

  return (
    <div className="category__prodCard">
      <div>
        <div className="category__prodImgWrap">
          <Link to={`/product-details/${id}`}>
            <img
              src={image.image_url}
              alt="imgs"
              className="caregory__prodImg"
            />
          </Link>
        </div>
        <div className="category__wishlist">
          <span className="tag tag--green">{brand.name}</span>
          {savedItems.some((el) => el.id === id) ? (
            <span onClick={() => removeWhitelist(id)}>
              <ion-icon className="heart" name="heart"></ion-icon>
            </span>
          ) : (
            <span onClick={() => addWhitelist(data)}>
              <ion-icon
                className="heart-outline"
                name="heart-outline"
              ></ion-icon>
            </span>
          )}
        </div>
        <div>
          <h3 className="category__prodName">
            <Link to={`/product-details/${id}`}>{name}</Link>
          </h3>
          {discount ? (
            <p className="discount">
              <span className="discount__price">
                {currency_formatter(previous_amount)}
              </span>
              <span className="tag tag--red">{Math.floor(discount)}%</span>
            </p>
          ) : null}
          <p className="price">{currency_formatter(amount)}</p>
        </div>
      </div>
      <div className="category__prodCardBody">
        {!is_fixed ? (
          <Link to={`/product-details/${id}`}>
            <button className="btn btn-primary btn-block">View product</button>
          </Link>
        ) : null}

        {cartsLocal.some((el) => el.id === id) && is_fixed ? (
          <button
            className="btn btn-lightgrey btn-block"
            onClick={() =>
              removeCart({
                id,
                src: image,
                name: name,
                brand: brand.name,
                color,
                price: Number(amount),
                quantity: 1,
                total: amount * 1,
                variation_info: null,
              })
            }
          >
            <span className="text-danger">Remove</span>
          </button>
        ) : null}

        {!cartsLocal.some((el) => el.id === id) && is_fixed ? (
          <button
            className="btn btn-primary btn-block"
            onClick={() =>
              addCart({
                id,
                src: image,
                name: name,
                color,
                quantity: 1,
                price: Number(amount),
                brand: brand.name,
                total: amount * 1,
                variation_info: null,
              })
            }
          >
            Add to cart
          </button>
        ) : null}
      </div>
    </div>
  );
};

export const ProdCategoryLoader = () => {
  return (
    <div className="category__prodCard">
      <div>
        <div className="category__prodImgWrap">
          <div className="category__prodImgWrap placeholder"></div>
        </div>
        <div className="category__wishlist">
          <span className="tag tag--green placeholder">samsung</span>
          <span className="placeholder">so</span>
        </div>
        <h3 className="category__prodName placeholder">placeholder</h3>
      </div>
      <div className="category__prodCardBody">
        <p className="discount placeholder"></p>
        <p className="price placeholder">20000</p>
      </div>
    </div>
  );
};

export default ProdCategory;
