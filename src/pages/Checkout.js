import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateShippingFee } from "../store/slices/cartSlice";
import {
  setDeliverToAddress,
  setDefaultAddress,
} from "../store/slices/addressSlice";
import axios from "axios";
import { axiosInstance, baseUrl, currency_formatter } from "../libries";
import { useEffect, useState, useRef } from "react";

//component
import Layout from "../containers/Layout";
import Breadcrumb from "../components/Breadcrumb";
import ShippingAddress from "../components/ShippingAddress";
import AvailableAddresses from "../components/AvailableAddresses";
import CartNotification from "../components/CartNotification";
import InsufficientBalance from "../components/InsufficientBalance";

//icons or images
import wallet from "../assets/imgs/icons/wallet-icon.png";
import truck from "../assets/imgs/icons/truck.png";
import OrderSummary from "../components/OrderSummary";

const Checkout = () => {
  const placeAnOrderRef = useRef();
  const dispatch = useDispatch();

  // getting state from global store to checkout an order
  const { shippingFee, coupon, total_products, coupon_amount_percent } =
    useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.carts);
  const totalFee = useSelector((state) => state.cart.totalOrderFee);
  const walletBal = useSelector((state) => state.auth.userDetails.wallet);
  const { deliverToAddress, newAddedAddressForDelivery, defaultAddress } =
    useSelector((state) => state.address);

  const token = useSelector((state) => state.auth.accessToken);

  // setting loading states here
  const [loading, setLoading] = useState(true);
  const [loadingShipping, setLoadingShipping] = useState(false);

  // state to show the notification on checkout page
  const [showCartNotify, setShowCartNotify] = useState(false);
  const [cartStatus, setCartStatus] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [shippingMethodMode, setShippingMethodMode] = useState(null);

  // use state to store shipping types
  const [shippingTypes, setShippingTypes] = useState(null);

  // getting the shippment methods here

  // state to get all shipping methods
  const [shippmentMethods, setShippmentMethods] = useState(null);

  // state to get selected shipping method
  const [selShippmentMtd, setSelShippmentMtd] = useState(null);

  // logic below sets the payload for checkout
  let allVariation = // checkout cart for product with or without variation
    cartItems?.map((cartItem) => {
      return cartItem.variation_info !== null
        ? {
            product_id: cartItem.id,
            variation: cartItem.variation_info?.map((variatn) => ({
              id: variatn.id,
              quantity: variatn.quantity,
            })),
          }
        : {
            product_id: cartItem.id,
            quantity: cartItem.quantity,
          };
    }) || [];

  // state to store pay with
  const [payWith, setPayWith] = useState(null);

  // state to keep track of the payment method
  const [paymentMtd, setPaymentMtd] = useState(null);

  // showing popup for insufficient balance
  const [insufficient, setInsufficient] = useState(false);

  // state for all addresses (removing the first return data here "allAddress" since it is unused)
  const [, setAllAddress] = useState(null);

  // function to close insufficient popup
  const ClosePopup = () => setInsufficient(false);

  const navigate = useNavigate();

  // checkout page progress bar
  const checkoutSteps = ["checkout", "payment", "review"];

  const [prevStep, setPrevStep] = useState();

  const [checkoutStep, setCheckoutStep] = useState("checkout");

  // state to get shipping methods
  const [shippingMtdCode, setShippingMtdCode] = useState("");

  const [shippingMtd, setShippingMtd] = useState(null);

  // side effect for checkout progress steps
  useEffect(() => {
    if (checkoutStep === "checkout") {
      setPrevStep(0);
    } else if (checkoutStep === "payment") {
      setPrevStep(1);
    } else {
      setPrevStep(2);
    }
  }, [checkoutStep]);

  // proceed to pay button to finally place an order
  const handleSelectPaymentMtd = (mtd) => {
    setPaymentMtd(mtd);
  };

  const [balAbleToOrder, setBalAbleToOrder] = useState(false);

  const [makingOrder, setMakingOrder] = useState(false);

  // state to show add shipping address
  const [shippingAddress, setShippingAddress] = useState(false);

  // state to show choose address pop up
  const [chooseAddress, setChooseAddress] = useState(false);

  // state to save address
  const [addNewAddress, setAddNewAddress] = useState({
    is_default: 0,
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    country: 161, // default value
    state: null,
    lg: null,
    city: "",
    address_type_id: 1, // default
  });

  // function to pay for order in checkout
  const handleOrders = (payMtd) => {
    if (!balAbleToOrder) return;

    placeAnOrderRef.current.innerHTML = `<span class="fas fa-spinner fa-spin"></span> Processing...`;
    placeAnOrderRef.current.setAttribute("disabled", "disabled");

    setMakingOrder(true);
    const orderData = {
      product_orders: allVariation,
      address_type_id: deliverToAddress.address_type_id,
      country_id: 161, // default value
      state_id: deliverToAddress.state_id || deliverToAddress.state,
      lg_id: deliverToAddress.lg_id || deliverToAddress.lg,
      use_as_default: deliverToAddress.is_default,
      shipping_method_id: shippingMethodMode,
      address: deliverToAddress.address,
      phone: deliverToAddress.phone_number,
      payment_code: paymentMtd,
      sub_total: total_products,
      shipping: shippingFee,
      total: Number(totalFee),
      delivery_address_id: deliverToAddress.id,
      carrier_name:
        shippingMethodMode === "carrier" ? selShippmentMtd.carrier_name : null,
      carrier_id:
        shippingMethodMode === "carrier"
          ? selShippmentMtd.carrier_reference
          : "",
      amount:
        shippingMethodMode === "carrier"
          ? Math.round(selShippmentMtd.amount)
          : null,
      carrier_logo:
        shippingMethodMode === "carrier" ? selShippmentMtd.carrier_logo : null,
      delivery_time:
        shippingMethodMode === "carrier"
          ? selShippmentMtd.delivery_time
          : shippingMtd.delivery_time,
      rate_id: "",
      coupon_code: coupon_amount_percent ? coupon : "",
    };

    axiosInstance(token)
      .post("/orders/checkout", orderData)
      .then((resp) => {
        if (payMtd !== "flutterwave") {
          const dataResp = resp.data.data.orders;
          navigate(`/thank-you?order_code=${dataResp.order_code}`);
        }

        if (payMtd === "flutterwave") {
          if (!resp.data.status && resp.data.link)
            window.location.href = resp.data.link;
        }
      })
      .catch((error) => {
        // trying to set the notification for error when placing an order here'
        setCartStatus("error");
        if (error.code === "ERR_BAD_REQUEST") {
          setCartMessage(error.response.data.message);
        } else {
          setCartMessage(error.message);
        }
        setShowCartNotify(true);
      })
      .finally(() => {
        placeAnOrderRef.current.removeAttribute("disabled", "disabled");
        placeAnOrderRef.current.innerHTML = "Proceed to Pay";
        setMakingOrder(false);
      });
  };

  // side effect to set payment button active
  useEffect(() => {
    if (!paymentMtd) return;
    if (paymentMtd === "flutterwave" || paymentMtd === "pay-on-pickup")
      setBalAbleToOrder(true);

    if (paymentMtd === "wallets") {
      const checkingToPlaceOrder = walletBal.available_balance > totalFee;
      if (checkingToPlaceOrder) {
        setBalAbleToOrder(true);
      } else {
        setBalAbleToOrder(false);
        setInsufficient(true);
      }
    }
  }, [totalFee, paymentMtd, walletBal.available_balance, shippingMtdCode]);

  // using the normal axios function here
  useEffect(() => {
    axios({
      url: `${baseUrl}/payments/method`,
      method: "GET",
    })
      .then((resp) => {
        setPayWith(resp.data.data.payment_methods);
      })
      .catch((error) => {
        setCartStatus("error");
        if (error.code === "ERR_BAD_REQUEST") {
          setCartMessage(error.response.data.message);
        } else {
          setCartMessage(error.message);
        }
        setShowCartNotify(true);
      });
  }, []);

  // fetching default address here
  useEffect(() => {
    axiosInstance(token)
      .get(`${baseUrl}/accounts/default/delivery/address`)
      .then((resp) => {
        const defaultAdd = resp.data.data.delivery_addresses;
        dispatch(setDefaultAddress(defaultAdd));
        setLoading(false);
        setLoadingShipping(true);
      })
      .catch((error) => {
        setLoading(false);
        setCartStatus("error");
        if (error.code === "ERR_BAD_REQUEST") {
          setCartMessage(error.response.data.message);
        } else {
          setCartMessage(error.message);
        }
        setShowCartNotify(true);
      });
  }, [token, dispatch]);

  const [states, setStates] = useState(null);

  // function to get state
  useEffect(() => {
    axios({
      url: `${baseUrl}/locations/states`,
      method: "GET",
    })
      .then((resp) => {
        setStates(resp.data.data.states);
      })
      .catch((error) => {
        setCartStatus("error");
        if (error.code === "ERR_BAD_REQUEST") {
          setCartMessage(error.response.data.message);
        } else {
          setCartMessage(error.message);
        }
        setShowCartNotify(true);
      });
  }, []);

  // useEffect to get shipping method from the backend
  useEffect(() => {
    axiosInstance(token)
      .get(`${baseUrl}/shipment/shipping/types`)
      .then((resp) => {
        setShippingTypes(resp.data.data.shipping);
      })
      .catch((error) => {
        setLoading(false);
        setCartStatus("error");
        if (error.code === "ERR_BAD_REQUEST") {
          setCartMessage(error.response.data.message);
        } else {
          setCartMessage(error.message);
        }
        setShowCartNotify(true);
      });
  }, [token]);

  const address = deliverToAddress ? deliverToAddress : defaultAddress;

  // side effect to get shipping rate for door delivery
  useEffect(() => {
    if (!address) return () => {};

    const stateName = states?.find((st) => st.id === address?.state_id);

    if (!stateName) return () => {};
    let itemToOrder = [];

    cartItems?.map((cartItem) =>
      cartItem.variation_info === null
        ? itemToOrder.push({
            description: cartItem.brand,
            name: cartItem.name,
            currency: "NGN",
            value: parseFloat(cartItem.price),
            quantity: cartItem.quantity,
            weight: 2,
          })
        : cartItem.variation_info?.map((withVar) =>
            itemToOrder.push({
              description: cartItem.brand,
              name: cartItem.name,
              currency: "NGN",
              value: parseFloat(withVar.amount),
              quantity: withVar.quantity,
              weight: 2,
            })
          )
    );

    if (itemToOrder == []) return () => {};

    const shipping = {
      pickup_address: {
        line1: "Bodija",
        line2: "Bodija",
        city: "Ibadan",
        state: "Oyo",
        country: "NG",
        first_name: "ShopNig",
        last_name: "ShopNig",
        phone: "+2348109967572",
      },
      delivery_address: {
        line1: address.address,
        line2: address.address,
        city: address.city,
        state: stateName.name,
        country: "NG",
        first_name: address.first_name,
        last_name: address.last_name,
        phone: address.phone_number,
      },
      parcel: {
        description: "Order Details",
        weight_unit: "kg",
        items: itemToOrder,
        metadata: {},
      },
      carrier_id: "CA-71017347351",
      currency: "NGN",
    };

    axiosInstance(token)
      .post("/shipment/rate", shipping)
      .then((resp) => {
        setLoadingShipping(false);
        const shippmentResp = resp.data.data;
        setShippmentMethods(shippmentResp);
      })
      .catch((error) => {
        setLoadingShipping(false);
        setCartStatus("error");
        if (error.code === "ERR_BAD_REQUEST") {
          setCartMessage(error.response.data.message);
        } else {
          setCartMessage(error.message);
        }
        setShowCartNotify(true);
      });
  }, [address, states, token, cartItems]);

  // function to get shipping methos selected
  const handleShippingMethod = (mtds) => {
    setShippingMtdCode(mtds.code);
    setShippingMtd(mtds);
    setShippingMethodMode(mtds.code);

    const getMethod = shippingTypes.find((mt) => mt.code === mtds.code);

    // dispatching shipping fee
    if (mtds.code === "pick-up" || mtds.code === "public-transport") {
      dispatch(updateShippingFee(Number.parseInt(getMethod.delivery_fee)));
    }
  };

  // side effect for checkout progress check
  useEffect(() => {
    if (shippingMtdCode && !paymentMtd) {
      setCheckoutStep("payment");
    }

    if (shippingMtdCode && paymentMtd) {
      setCheckoutStep("review");
    }
  }, [shippingMtdCode, paymentMtd]);

  // function for handling selected shipping method
  const handleSelMethod = (mtdShip) => {
    const getShip = shippmentMethods.find((mt) => mt.carrier_name === mtdShip);

    setSelShippmentMtd(getShip);
    setShippingMtdCode(mtdShip);

    // dispatching shipping fee
    dispatch(updateShippingFee(Math.round(getShip.amount)));

    // dispatching shipping method mode
    setShippingMethodMode("carrier");
  };

  const showShippingAddress = () => {
    setShippingAddress(true);
  };

  // restructuring useEffect to set deliverToAddress
  useEffect(() => {
    if (defaultAddress && !newAddedAddressForDelivery) {
      dispatch(setDeliverToAddress(defaultAddress));
    } else if (
      (defaultAddress && newAddedAddressForDelivery) ||
      (!defaultAddress && newAddedAddressForDelivery)
    )
      dispatch(setDeliverToAddress(newAddedAddressForDelivery));
    else dispatch(setDeliverToAddress(null));
  }, [defaultAddress, newAddedAddressForDelivery, dispatch]);

  const [selPayment, setSelPayment] = useState(payWith);

  // side effect for handling paying on pickup
  useEffect(() => {
    if (shippingMtdCode !== "pick-up") {
      setSelPayment(payWith?.filter((pay) => pay.default === 1));
    } else setSelPayment(payWith);
  }, [shippingMtdCode, payWith]);

  return (
    <>
      <Layout>
        <Breadcrumb name="Product detail >" />
        <div className="container">
          <div className="checkout__container">
            <div className="checkout">
              <div className="checkout__body">
                <div className="">
                  <h3 className="checkout__text">Checkout</h3>
                </div>
                <div className="processes show__processes__up">
                  <div className="processes__list">
                    {checkoutSteps?.map((step, index) => (
                      <div
                        key={index}
                        className={`${step === checkoutStep ? "active" : ""}
                            ${index < prevStep ? "checked" : ""}
                        } processes__list__item add__margin`}
                      >
                        <div className="progress__count"></div>
                        <p
                          className={`${
                            step === checkoutStep
                              ? "active__label"
                              : "inactive__label"
                          } progress__label`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="personal__detail">
                <div className="personal__body">
                  <div className="delivery">
                    <h1 className="deliver">Deliver to:</h1>
                    <div
                      className={`${
                        shippingAddress ? "disabled__text" : ""
                      } add__details`}
                      onClick={() => showShippingAddress()}
                    >
                      <ion-icon name="add-outline"></ion-icon>
                      <span>Add another shipping details</span>
                    </div>
                    <ShippingAddress
                      shipping={shippingAddress}
                      setDeliveryAddress={setShippingAddress}
                      setAddNewAddress={setAddNewAddress}
                      addNewAddress={addNewAddress}
                      setShowAlert={setShowCartNotify}
                      setAlertStatus={setCartStatus}
                      setAlertMsg={setCartMessage}
                      setAllAddress={setAllAddress}
                    />
                    {loading && (
                      <div className="loading__spin__address">
                        <span className="loader"></span>
                      </div>
                    )}
                    {!loading && (
                      <div className="deliver__part">
                        {!defaultAddress && !deliverToAddress && (
                          <div>
                            <p className="infos">
                              No Default Address Added yet
                            </p>
                          </div>
                        )}
                        {deliverToAddress && (
                          <div className="deliver_wrap">
                            <h2 className="details__title">Default Address</h2>
                            <div className="deliver__info">
                              <div>
                                {deliverToAddress && (
                                  <p className="infos">
                                    {deliverToAddress.first_name +
                                      " " +
                                      deliverToAddress.last_name}
                                  </p>
                                )}
                                {!deliverToAddress.first_name &&
                                  !deliverToAddress.last_name &&
                                  !deliverToAddress.address &&
                                  !deliverToAddress.phone_number && (
                                    <p className="infos">
                                      No Address Added yet
                                    </p>
                                  )}
                              </div>
                              <div>
                                <p className="infos">
                                  {deliverToAddress &&
                                    deliverToAddress.phone_number}
                                </p>
                              </div>
                              <div className="adrs">
                                <address className="address">
                                  {deliverToAddress && deliverToAddress.address}
                                </address>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="choose">
                          <button
                            className="choose__btn"
                            onClick={() => setChooseAddress(true)}
                          >
                            Change Delivery Address
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {!loading && !deliverToAddress ? (
                    <div className="no__address__yet">
                      <p>Add an Address to view shipping rate</p>
                    </div>
                  ) : (
                    <>
                      {loadingShipping && (
                        <div className="loading__spin__address">
                          <span className="loader"></span>
                        </div>
                      )}
                      {!loadingShipping && shippmentMethods && (
                        <div className="shipping__methods">
                          <h3 className="shipping__select">
                            Select Shipping Method
                          </h3>
                          <div className="shipping__part">
                            {shippingTypes?.map((shipMtd) => (
                              <label htmlFor={shipMtd.code} key={shipMtd.id}>
                                <div
                                  className={`${
                                    (shippingMtdCode === "carrier" &&
                                      shipMtd.code === "carrier" &&
                                      !selShippmentMtd) ||
                                    (shippingMtdCode === "carrier" &&
                                      shipMtd.code === "carrier" &&
                                      selShippmentMtd)
                                      ? "border__remove"
                                      : ""
                                  } shipping__part__option`}
                                >
                                  <div className="deliveries">
                                    <div className="">
                                      {shipMtd.code !== "carrier" &&
                                        shipMtd.code !== selShippmentMtd && (
                                          <img
                                            // src={shipMtd.img}
                                            src={truck}
                                            alt={shipMtd.name}
                                            className="truck"
                                          />
                                        )}
                                      {shipMtd.code === "carrier" && (
                                        <img
                                          src={
                                            selShippmentMtd
                                              ? selShippmentMtd.carrier_logo
                                              : truck // "truck" here will be replaced by shipping type image from the endpoint
                                          }
                                          alt={shipMtd.name}
                                          className="truck"
                                        />
                                      )}
                                    </div>
                                    <div className="shipping__picks">
                                      <div className="shipping__carrier">
                                        <h3 className="type">{shipMtd.name}</h3>
                                      </div>
                                      {!selShippmentMtd &&
                                        shipMtd.code === "carrier" && (
                                          <>
                                            <p>Select Carrier</p>
                                            <p style={{ visibility: "hidden" }}>
                                              Carrier method
                                            </p>
                                          </>
                                        )}
                                      {selShippmentMtd &&
                                        shipMtd.code === "carrier" && (
                                          <>
                                            <p className="fee">
                                              {selShippmentMtd?.carrier_name}{" "}
                                              <span className="fee__bold">
                                                (₦{" "}
                                                {Math.round(
                                                  selShippmentMtd?.amount
                                                )}
                                                )
                                              </span>
                                            </p>
                                            <p className="datee">
                                              Delivery Time: &nbsp;&nbsp;
                                              <span className="datee__bold">
                                                {selShippmentMtd?.delivery_time}
                                              </span>
                                            </p>
                                          </>
                                        )}
                                      {shipMtd.code !== "carrier" && (
                                        <>
                                          <p className="fee">
                                            Delivery fee: &nbsp;&nbsp;
                                            <span className="fee__bold">
                                              ₦ {shipMtd.delivery_fee}
                                            </span>
                                          </p>
                                          <p className="datee">
                                            Delivery Time: &nbsp;&nbsp;
                                            <span className="datee__bold">
                                              {shipMtd.delivery_time}
                                            </span>
                                          </p>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  {selShippmentMtd &&
                                    shipMtd.code === "carrier" && (
                                      <p
                                        onClick={(e) => {
                                          setShippingMtdCode("carrier");
                                          e.stopPropagation();
                                        }}
                                        className="change__carrier"
                                      >
                                        Change
                                      </p>
                                    )}
                                  <div className="deliveries__iconss">
                                    <input
                                      className="first__radio"
                                      type="radio"
                                      id={shipMtd.code}
                                      name="shippingMtdCode"
                                      value={shipMtd.code}
                                      onChange={() =>
                                        handleShippingMethod(shipMtd)
                                      }
                                    />
                                  </div>
                                </div>

                                {((shippingMtdCode === "carrier" &&
                                  shipMtd.code === "carrier" &&
                                  !selShippmentMtd) ||
                                  (shippingMtdCode === "carrier" &&
                                    shipMtd.code === "carrier" &&
                                    selShippmentMtd)) && (
                                  <ul>
                                    {shippmentMethods?.map((mtds, index) => (
                                      <li className="shipping__method__list">
                                        <div
                                          htmlFor={mtds.carrier_name}
                                          key={index}
                                          onClick={() =>
                                            handleSelMethod(mtds.carrier_name)
                                          }
                                        >
                                          <div className="remove__border">
                                            <div className="deliveries">
                                              <div className="">
                                                <img
                                                  src={mtds.carrier_logo}
                                                  alt="carrier logo"
                                                  className="truck"
                                                />
                                              </div>
                                              <div className="shipping__picks">
                                                <div className="shipping__carrier">
                                                  <h3 className="type">
                                                    {mtds.carrier_name}
                                                  </h3>
                                                </div>
                                                <p className="fee">
                                                  Delivery fee: &nbsp;&nbsp;
                                                  <span className="fee__bold">
                                                    ₦ {Math.round(mtds.amount)}
                                                  </span>
                                                </p>
                                                <p className="datee">
                                                  Delivery Time: &nbsp;&nbsp;
                                                  <span className="datee__bold">
                                                    {mtds.delivery_time}
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                            <div className="deliveries__iconss">
                                              <input
                                                className="first__radio"
                                                type="radio"
                                                id={mtds.carrier_name}
                                                name="shippingMtdCode"
                                                value={mtds.carrier_name}
                                                checked={
                                                  selShippmentMtd?.carrier_name ===
                                                  mtds.carrier_name
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* showing the payment type */}

                  {shippingMtdCode && shippingMtdCode !== "carrier" && (
                    <>
                      <div className="shipping__methods">
                        <h3 className="shipping__select">Pay with:</h3>
                        <div className="shipping__part">
                          {selPayment?.map((mtd) => (
                            <label htmlFor={mtd.id} key={mtd.id}>
                              <div className="payment__option">
                                <div className="payments">
                                  <div className="">
                                    <img
                                      src={wallet}
                                      alt=""
                                      className="wallet"
                                    />
                                  </div>
                                  <div className="payments__pick">
                                    <div className="payments__pays">
                                      <div>
                                        <h3 className="payments__mode">
                                          {mtd.name}
                                        </h3>
                                      </div>
                                      <div>
                                        {mtd.name === "ShopNig Wallet" && (
                                          <span className="pays__amount">
                                            {currency_formatter(
                                              walletBal.available_balance
                                            )}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <p className="messg">{mtd.description}</p>
                                  </div>
                                </div>
                                <div className="deliveries__iconss">
                                  <input
                                    type="radio"
                                    id={mtd.id}
                                    name="paymentMtd"
                                    value={mtd.code}
                                    onChange={(e) => e.target.value}
                                    checked={paymentMtd === mtd.code}
                                    onClick={() =>
                                      handleSelectPaymentMtd(mtd.code)
                                    }
                                  />
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="note">
                        <h4 className="note__text">Note:</h4>
                        <p className="note__notice">
                          A total of{" "}
                          <span className="spaan">
                            {currency_formatter(totalFee)}
                          </span>{" "}
                          will be deducted from your account.
                        </p>
                        <p className="note__confirm">
                          Kindly confirm you have sufficient balance for
                          payment. Thank you!
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="processes show__processes__down">
                  <div className="processes__list">
                    {checkoutSteps?.map((step, index) => (
                      <div
                        key={index}
                        className={`${step === checkoutStep ? "active" : ""}
                            ${index < prevStep ? "checked" : ""}
                        } processes__list__item add__margin`}
                      >
                        <div className="progress__count"></div>
                        <p
                          className={`${
                            step === checkoutStep
                              ? "active__label"
                              : "inactive__label"
                          } progress__label`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <OrderSummary
                  balAbleToOrder={balAbleToOrder}
                  shippingMtdCode={shippingMtdCode}
                  click={() => handleOrders(paymentMtd)}
                  placeAnOrderRef={placeAnOrderRef}
                  makingOrder={makingOrder}
                  paymentMtd={paymentMtd}
                />
              </div>
            </div>
          </div>
          {insufficient && (
            <InsufficientBalance
              title="ShopnigWallet"
              setInsufficient={setInsufficient}
              close={ClosePopup}
            />
          )}
          {chooseAddress && (
            <AvailableAddresses
              title="Choose from saved address"
              setChangeAddress={setChooseAddress}
            />
          )}
        </div>
      </Layout>
      {showCartNotify && (
        <CartNotification
          cartMessage={cartMessage}
          cartStatus={cartStatus}
          setShowCartNotify={setShowCartNotify}
        />
      )}
    </>
  );
};

export default Checkout;
