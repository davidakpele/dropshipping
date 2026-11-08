import React, { useEffect, useState } from "react";
import { axiosInstance, currency_formatter } from "../libries";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  removeCartItem,
  addCartQuantity,
  removeCartQuantiy,
} from "../store/slices/cartSlice";
import CartNotification from "./CartNotification";

import warn from "../assets/imgs/icons/warning.svg";
import facebook from "../assets/imgs/icons/facebook.svg";
import instagram from "../assets/imgs/icons/instagram.svg";
import twitter from "../assets/imgs/icons/twitter.svg";
import { removeSavedItem, saveItem } from "../store/slices/savedItemSlice";
import Spinner from "./Spinner";
import ProductImageModal from "./ProductImageModal";

const ProductPreview = ({ data, setProdData }) => {
  const {
    id,
    name,
    brand: { name: brand_name },
    amount,
    images,
    code,
    in_stock,
    variation_info,
    color,
    is_fixed,
  } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [variationsID, setVariationsID] = useState([]);
  const cart = useSelector((state) => state.cart.carts);
  const userToken = useSelector((state) => state.auth.accessToken);
  const savedItems = useSelector((state) => state.savedItems.items);
  const [is_loading, setLoading] = useState(false);
  const [var_info, setVarInfo] = useState({
    id: null,
    amount: null,
    quantity: 1,
    variations: [],
  });
  const [show_popup, setShow_popup] = useState(false);

  let prod = cart.find((itm) => itm.id === id);

  if (var_info.id) {
    prod = prod?.variation_info.find((varInf) => varInf.id === var_info.id);
  }

  // state to show the notification
  const [showCartNotify, setShowCartNotify] = useState(false);
  const [cartStatus, setCartStatus] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  // state to ascertain that all the conditions have been selected
  const [allV, setAllv] = useState([]);

  // resets the quantity to 1 when the variation changes
  useEffect(() => {
    setQuantity(1);
  }, [var_info.id]);

  useEffect(() => {
    if (
      variation_info?.length === variationsID.length &&
      allV.length >= variation_info?.length
    ) {
      setLoading(true);

      axiosInstance()
        .get(`products/variation/details/${id}`, {
          params: {
            variation_ids: variationsID,
          },
        })
        .then(
          (resp) => {
            const [data] = resp.data.data.product_variation;

            if (data?.in_stock === 1) {
              setProdData((curr) => ({
                ...curr,
                in_stock: data.quantity,
                amount: data.amount,
              }));

              setVarInfo((curr) => ({
                ...curr,
                id: data?.id,
                amount: data.amount,
                total: data.amount * curr.quantity,
              }));
            } else {
              setProdData((curr) => ({
                ...curr,
                in_stock: 0,
              }));

              setVarInfo((curr) => ({
                ...curr,
                id: data?.id,
                amount: data.amount,
                total: data.amount * curr.quantity,
              }));
            }
          }
          // }
        )
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [variationsID, variation_info, id, setProdData, dispatch]);

  const addCart = (item) => {
    dispatch(addCartItem(item));

    if (userToken)
      axiosInstance(userToken)
        .post("/carts/add", {
          carts: [
            {
              product_id: item.id,
              quantity: 1,
            },
          ],
        })
        .then((resp) => {
          resp.data.status && dispatch(addCartItem(item));
        })
        .catch((err) => {
          return err.response;
        });
    else dispatch(addCartItem(item));

    // trying to set the notification for adding to cart here
    setCartStatus("success");
    setCartMessage("Product successfully added to cart");
    setShowCartNotify(true);

    setAllv([]);
    setVariationsID([]);
    setProdData((curr) => ({
      ...curr,
      in_stock: null,
    }));

    let el = document.querySelectorAll(".prodVariation__dropdown");
    el.forEach((el) => {
      el.value = "default";
    });

    // resetting var_info to default after adding to cart
    setVarInfo({
      id: null,
      amount: null,
      quantity: 1,
      variations: [],
    });
  };

  const removeCart = (item, var_id) => {
    dispatch(removeCartItem({ ...item, variation_id: var_id }));

    if (userToken)
      axiosInstance(userToken)
        .post("/carts/remove", {
          product_id: item.id,
        })
        .then((resp) => {
          resp.data.status &&
            dispatch(removeCartItem({ ...item, variation_id: var_id }));
        })
        .catch((err) => {
          return err.response;
        });
    else dispatch(removeCartItem({ ...item, variation_id: var_id }));

    // trying to set the notification for removing to cart here'
    setCartStatus("error");
    setCartMessage("Product successfully removed to cart");
    setShowCartNotify(true);

    // resetting var_info to default after adding to cart
    setAllv([]);
    setVariationsID([]);

    let el = document.querySelectorAll(".prodVariation__dropdown");
    el.forEach((el) => {
      el.value = "default";
    });

    setVarInfo({
      id: null,
      amount: null,
      quantity: 1,
      variations: [],
    });
  };

  const removeQuantity = (id, var_id) => {
    prod
      ? dispatch(removeCartQuantiy({ ...id, variation_id: var_id }))
      : quantity > 1 && setQuantity((curr) => curr - 1);
  };

  const addQuantity = (id, var_id) => {
    prod
      ? dispatch(addCartQuantity({ ...id, variation_id: var_id }))
      : setQuantity((curr) => curr + 1);
  };

  const addWhitelist = (item) => {
    dispatch(saveItem(item));

    if (userToken)
      axiosInstance(userToken)
        .post("/saved-products/saved-items", { products_id: [{ id: item.id }] })
        .then((resp) => {
          if (resp.data.status) {
            dispatch(saveItem(item));
          }
        })
        .catch((err) => {
          return err.response;
        });
    else dispatch(saveItem(item));
  };

  const removeWhitelist = (id) => {
    dispatch(removeSavedItem(id));

    if (userToken)
      axiosInstance(userToken)
        .post("/products/remove/saved", { product_id: id })
        .then((resp) => {
          if (resp.data.status) {
            dispatch(removeSavedItem(id));
          }
        })
        .catch((err) => {
          return err.response;
        });
    else dispatch(removeSavedItem(id));
  };

  const update_variationInfo = (e) => {
    let [var_valueID, var_index, var_name] = String(e.target.value).split(",");

    var_index = Number(var_index);
    var_valueID = Number(var_valueID);

    if (e.target.value !== "default") {
      const varIds = [...variationsID];
      const varNames = [...var_info.variations];

      varIds[var_index] = var_valueID;
      varNames[var_index] = var_name;

      setAllv([...allV, varNames]);

      setVarInfo((curr) => ({
        ...curr,
        variations: varNames,
      }));

      setVariationsID(varIds);
    }

    if (e.target.value === "default") {
      setAllv([]);
      setVariationsID([]);

      let el = document.querySelectorAll(".prodVariation__dropdown");
      el.forEach((el) => {
        el.value = "default";
      });
      setVarInfo({
        id: null,
        amount: null,
        quantity: 1,
        variations: [],
      });
    }
  };

  // implementing product images display here

  // reset to the first image of a product if product changes.
  useEffect(() => {
    setActiveProdImg(images[0]);
  }, [images]);

  // setting active image to the first one by default but it can be changed once the user clicks on an image
  const [activeProdImg, setActiveProdImg] = useState(images[0]);

  // this state can be changed to any number
  const numOfImageShown = 4;

  //state to control the up and down arrow to display images
  const [moveImageDown, setMoveImageDown] = useState(numOfImageShown);
  const [moveImageUp, setMoveImageUp] = useState(0);

  // function to set an image active when clicked
  const setActive = (itm) => {
    setActiveProdImg(itm);
  };

  // function that controls the arrow down
  const handleClickDown = () => {
    if (moveImageDown < images.length) {
      setMoveImageDown((moveImageDown) => moveImageDown + 1);
      setMoveImageUp((moveImageUp) => moveImageUp + 1);
    }
  };

  // function that controls the arrow up
  const handleClickUp = () => {
    if (moveImageUp > 0) {
      setMoveImageDown((moveImageDown) => moveImageDown - 1);
      setMoveImageUp((moveImageUp) => moveImageUp - 1);
    }
  };

  const [activeProdModal, setActiveProdModal] = useState(activeProdImg);

  const handeNext = () => {
    for (let i = 0; i < images.length; i++) {
      if (activeProdModal.id === images[i].id) {
        if (activeProdModal.id === images[images.length - 1].id) {
          setActiveProdModal(images[0]);
        } else {
          setActiveProdModal(images[i + 1]);
        }
      }
    }
  };

  const handePrev = () => {
    for (let i = 0; i < images.length; i++) {
      if (activeProdModal === images[i]) {
        if (activeProdModal === images[0]) {
          setActiveProdModal(images[images.length - 1]);
        } else {
          setActiveProdModal(images[i - 1]);
        }
      }
    }
  };

  return (
    <>
      <div className="prodPreview__itm">
        <div className="prodPreview__itmWrap">
          <div className="prodPreview__display">
            <div className="prodPreview__displayWrap">
              <div className="prodPreview__imgWrap">
                <img
                  src={activeProdImg.image_url}
                  alt="product preview"
                  className="prodPreview__img main"
                  onClick={() => setShow_popup(true)}
                />
              </div>
              <div className="prodPreview__mobile__images">
                <span onClick={handePrev} className="prev">
                  <ion-icon name="chevron-back-outline"></ion-icon>
                </span>
                <img
                  src={activeProdModal.image_url}
                  alt="product preview"
                  className="prodPreview__img main"
                  onClick={() => setShow_popup(true)}
                />
                <span onClick={handeNext} className="prev">
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </span>
              </div>
              <div className="prodPreview__images">
                <div
                  className={`${
                    images.length === numOfImageShown
                      ? "hide__arrows"
                      : "arrow-up"
                  } ${moveImageUp === 0 && "hide__arrows"}`}
                  onClick={handleClickUp}
                >
                  <ion-icon name="arrow-up-outline"></ion-icon>
                </div>
                {images.slice(moveImageUp, moveImageDown)?.map((itm) => (
                  <div
                    className="prodPreview__imgItem"
                    onClick={() => setActive(itm)}
                    key={itm.id}
                  >
                    <img
                      src={itm.image_url}
                      alt=""
                      className={`${
                        itm.id === activeProdImg.id && "active"
                      } prodPreview__img`}
                      key={itm.id}
                    />
                  </div>
                ))}
                <div
                  className={`${
                    images.length === 4 ? "hide__arrows" : "arrow-down"
                  } ${
                    (moveImageDown === images.length ||
                      moveImageDown > images.length) &&
                    "hide__arrows"
                  }`}
                  onClick={handleClickDown}
                >
                  <ion-icon name="arrow-down-outline"></ion-icon>
                </div>
              </div>
            </div>
            <p>click on image to zoom in</p>
          </div>
          <div className="prodPreview__info">
            <div className="prodPreview__infoCaption">
              <div className="prodPreview__infoHeader">
                <h3>{name}</h3>
              </div>
              <p>
                Brand: <span className="text-primary">{brand_name}</span>
              </p>
              <p>
                Product code: <span className="text-dark">{code}</span>
              </p>
            </div>
            <div className="prodVariation">
              <div className="prodVariation__header">
                <span className="brandnew">brand new</span>
              </div>
              {variation_info?.length && !is_fixed
                ? variation_info.map((itm, id) => (
                    <div
                      className="prodVariation__item"
                      key={itm.variation_name}
                    >
                      <div className="prodVariation__itemWrap">
                        <span className="prodVariation__title">
                          {itm.variation_name}
                        </span>
                        <div className="prodVariation__option">
                          <select
                            name="variations"
                            className="prodVariation__dropdown"
                            onChange={(e) => update_variationInfo(e)}
                          >
                            <option value="default">
                              select {itm.variation_name}
                            </option>
                            {itm.variation_values.map((itms, ids) => (
                              <option
                                value={`${itms.id},${id},${itms.name}`}
                                key={ids}
                              >
                                {itms.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
              <div className="prodVariation__item">
                {is_fixed ||
                (var_info?.id && variationsID.length && in_stock !== 0) ? (
                  <div className="prodVariation__itemWrap">
                    <span className="prodVariation__title">Quantity</span>
                    <div className="prodVariation__option prodVariation__item-flex">
                      <div className="btn btn__count">
                        <button
                          className="btn btn-primary"
                          onClick={() => removeQuantity(data, var_info.id)}
                        >
                          -
                        </button>
                        <div className="btn-input">
                          {prod ? prod.quantity : quantity}
                        </div>
                        <button
                          className={`${
                            quantity >= in_stock && "disableBtn"
                          } btn btn-primary `}
                          onClick={() => addQuantity(data, var_info.id)}
                        >
                          +
                        </button>
                      </div>
                      <p className={`${in_stock < 7 && "text-danger"}`}>
                        {in_stock && `${in_stock} units left`}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="prodPricing">
              {is_fixed || (var_info?.id && variationsID.length) ? (
                <div className="prod__price">
                  <p className="price__label">Price: </p>
                  <p className="price">
                    {prod?.quantity
                      ? currency_formatter(amount * prod?.quantity)
                      : currency_formatter(amount * quantity)}
                  </p>
                </div>
              ) : null}
              <div className="prodPricing__action">
                {!var_info?.id && !is_fixed ? (
                  <button
                    className="btn btn-lightgrey"
                    style={{ pointerEvents: "none" }}
                    disabled
                  >
                    {is_loading ? <Spinner color="black" /> : "Add to cart"}
                  </button>
                ) : null}

                {(var_info?.id || is_fixed) && in_stock === 0 && !prod ? (
                  <button
                    className="btn btn-lightgrey"
                    style={{ pointerEvents: "none" }}
                  >
                    {is_loading ? <Spinner color="black" /> : "Out of Stock"}
                  </button>
                ) : null}

                {(var_info?.id || is_fixed) && in_stock !== 0 && !prod ? (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      addCart({
                        id,
                        name,
                        color,
                        quantity,
                        src: images[0],
                        brand: brand_name,
                        price: Number(amount),
                        total: Number(amount) * Number(quantity),
                        variation_info: is_fixed
                          ? null
                          : [
                              {
                                ...var_info,
                                quantity: prod ? prod?.quantity : quantity,
                                total:
                                  (prod?.quantity ?? quantity) *
                                  var_info.amount,
                              },
                            ],
                      });
                    }}
                  >
                    {is_loading ? <Spinner /> : "Add to cart"}
                  </button>
                ) : null}

                {(is_fixed || var_info?.id) && prod ? (
                  <button
                    className="btn btn-lightgrey btn-block"
                    onClick={() => removeCart(data, prod.id ?? null)}
                  >
                    {is_loading ? (
                      <Spinner color="black" />
                    ) : (
                      <span className="text-danger">Remove</span>
                    )}
                  </button>
                ) : null}

                {(is_fixed || var_info?.id) && in_stock !== 0 ? (
                  <button
                    className="btn btn-primary-outline"
                    onClick={() => {
                      if (!userToken) navigate("/login");
                      addCart({
                        id,
                        name,
                        color,
                        src: images[0],
                        brand: brand_name,
                        price: Number(amount),
                        quantity: prod?.quantity ?? quantity,
                        total: Number(amount) * Number(quantity),
                        variation_info: is_fixed
                          ? null
                          : [
                              {
                                ...var_info,
                                quantity: prod ? prod?.quantity : quantity,
                                total:
                                  (prod?.quantity ?? quantity) *
                                  var_info.amount,
                              },
                            ],
                      });

                      setVariationsID([]);
                      navigate("/checkout");
                    }}
                  >
                    Buy Now
                  </button>
                ) : null}

                {savedItems.some((el) => el.id === id) ? (
                  <button
                    className="btn btn-blue-outline"
                    onClick={() => removeWhitelist(id)}
                  >
                    Unsave
                  </button>
                ) : (
                  in_stock !== 0 && (
                    <button
                      className="btn btn-blue-outline"
                      onClick={() => {
                        if (!userToken) navigate("/login");
                        addWhitelist(data);
                      }}
                    >
                      <img src="/images/heart.svg" alt="like" />
                      Save for later
                    </button>
                  )
                )}
              </div>
              <div className="prodPricing__info">
                <div className="prodPricing__infoText">
                  <div className="ico">
                    <img src={warn} alt="warning" />
                  </div>
                  <p>Call us for bulk purchase: 2349000000000</p>
                </div>
                <div className="prodPricing__infoIcon">
                  <p>
                    Share:
                    <span className="icon">
                      <a
                        target="_blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                        class="fb-xfbml-parse-ignore"
                      >
                        <img src={facebook} alt="facebook" />
                      </a>
                      <a
                        class="twitter-share-button"
                        href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                        data-size="large"
                      >
                        <img
                          src="/images/X-twitter.svg"
                          alt="twitter"
                          className="x-twitter twitter"
                        />
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCartNotify && (
        <CartNotification
          cartMessage={cartMessage}
          cartStatus={cartStatus}
          setShowCartNotify={setShowCartNotify}
        />
      )}
      {show_popup && (
        <ProductImageModal
          img={images}
          setShow_popup={setShow_popup}
          activeProdImg={activeProdImg}
        />
      )}
    </>
  );
};

export default ProductPreview;

export const ProductPreviewLoader = () => {
  return (
    <div className="prodPreview__itm">
      <div className="prodPreview__itmWrap">
        <div className="prodPreview__display">
          <div className="prodPreview__displayWrap">
            <div className="prodPreview__imgWrap">
              <img
                src={ProductPreviewLoader}
                alt=""
                className="prodPreview__img main"
              />
            </div>
            <div className="prodPreview__images">
              <div className="prodPreview__imgItem">
                <img src={instagram} alt="" className="prodPreview__img" />
                <img src={instagram} alt="" className="prodPreview__img" />
                <img src={instagram} alt="" className="prodPreview__img" />
                <img src={instagram} alt="" className="prodPreview__img" />
              </div>
            </div>
          </div>
          <p>Put cursor over image to zoom in</p>
        </div>
        <div className="prodPreview__info">
          <div className="prodPreview__infoCaption">
            <div className="prodPreview__infoHeader">
              <h3>name</h3>
            </div>
            <p>
              Brand: <span className="text-primary">brand name</span>
            </p>
            <p>
              Product code: <span className="text-dark">code</span>
            </p>
          </div>

          <div className="prodVariation">
            <div className="prodVariation__header">
              Conditon: <span className="brandnew">brand new</span>
            </div>
            <div className="prodVariation__item">
              <div className="prodVariation__itemWrap">
                <span className="prodVariation__title">Storage</span>
                <div className="prodVariation__option">
                  <select
                    name="variations"
                    className="prodVariation__dropdown"
                    id="vairiations"
                  >
                    <option value="256">select storage</option>
                    <option value="256">125GB</option>
                    <option value="256">64GB</option>
                    <option value="256">32GB</option>
                    <option value="256">10GB</option>
                    <option value="256">5GB</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="prodVariation__item">
              <div className="prodVariation__itemWrap">
                <span className="prodVariation__title">Color</span>
                <div className="prodVariation__option">
                  <select
                    name="variations"
                    className="prodVariation__dropdown"
                    id="vairiations"
                  >
                    <option value="256" disabled>
                      select color
                    </option>
                    <option value="256">red</option>
                    <option value="256">blue</option>
                    <option value="256">green</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="prodVariation__item">
              <div className="prodVariation__itemWrap">
                <span className="prodVariation__title">Quantity</span>
                <div className="prodVariation__option">
                  <div className="btn btn__count">
                    <button className="btn btn-primary">-</button>
                    <div className="btn-input">1</div>
                    <button className="btn btn-primary">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="prodPricing">
            <p>Price: </p>
            <p className="price">price</p>
            <div className="prodPricing__action">
              <button className="btn btn-primary btn-block">Add to cart</button>
              <Link to="/checkout">
                <button className="btn btn-primary-outline">Buy Now</button>
              </Link>
              <button className="btn btn-blue-outline">Save for later</button>
            </div>
            <div className="prodPricing__info">
              <div className="prodPricing__infoText">
                <div className="ico">
                  <img src={warn} alt="warning" />
                </div>
                <p>Call us for bulk purchase</p>
              </div>
              <div className="prodPricing__infoIcon">
                <p>
                  Share:{" "}
                  <span className="icon">
                    <img src={facebook} alt="facebook" />
                    <img src={twitter} alt="facebook" />
                    <img src={instagram} alt="facebook" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImgPopup = ({ img, setShow_popup }) => (
  <div className="img-popupBgs">
    <div className="img-popupBg"></div>
    <div className="img-popup">
      <div className="img-btn">
        <span onClick={() => setShow_popup(false)}>
          <ion-icon name="close-outline"></ion-icon>
        </span>
      </div>
      <div className="main">
        <img
          src={img[0]?.image_url}
          alt="product preview"
          className="prodPreview__img main"
        />
      </div>
      <div className="aside">
        <div className="aside__wrap">
          {img?.map((itm, i) => (
            <div className="aside__itm" key={itm.id}>
              <div className="main">
                <img src={itm?.image_url} alt="product preview" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
