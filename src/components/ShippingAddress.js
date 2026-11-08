import { useEffect, useState, useRef } from "react";
import { baseUrl } from "../libries";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { validateAddress } from "../validate";

//icons
import flag from "../assets/imgs/icons/flag.svg";
import {
  setDefaultAddress,
  setNewAddedAddressForDelivery,
} from "../store/slices/addressSlice";

// dummy data for country phone codes
// const countryCode = [
//   {
//     flag: flag,
//     code: "+234",
//   },
//   {
//     flag: flag,
//     code: "+223",
//   },
//   {
//     flag: flag,
//     code: "+262",
//   },
//   {
//     flag: flag,
//     code: "+250",
//   },
//   {
//     flag: flag,
//     code: "+441",
//   },
// ];

const ShippingAddress = ({
  shipping,
  setDeliveryAddress,
  setAddNewAddress,
  addNewAddress,
  setAlertMsg,
  setAlertStatus,
  setShowAlert,
  setAllAddress,
  setLinks,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPhoneCode, setShowPhoneCode] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);
  const [checkedDefault, setCheckedDefault] = useState(false);

  // ref to set loading spinner when adding address
  const addAddressRef = useRef();

  // state for address type
  const [addressType, setAddressType] = useState();
  // temporary state to get type of address change
  const [changeAddressType, setChangeAddressType] = useState("home");
  // list of all states
  const [states, setStates] = useState([]);
  // list of all local government
  const [localGovt, setLocalGovt] = useState([]);
  // list of all cities
  const [cities, setCities] = useState([]);
  // state to get the state selected
  const [selectedState, setSelectedState] = useState({});
  // state to get the local govt selected
  const [selectedLocalGovt, setSelectedLocalGovt] = useState({});
  // state to get the city selected
  const [selectedCity, setSelectedCity] = useState({});
  // state to catch shipping address input errors
  const [shippingErr, setShippingErr] = useState("");
  // state for frontend error message validation
  const [errorMessage, setErrorMessage] = useState({});

  // state to get the state option selected
  const [getStateOption, setGetStateOption] = useState("");
  // state to get the state option selected
  const [getLocalGovtOption, setGetLocalGovtOption] = useState("");

  const [code, setCode] = useState("");

  const path = location.pathname;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddNewAddress((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  useEffect(() => {
    const err = validateAddress(addNewAddress);
    setErrorMessage(err);
  }, [addNewAddress]);

  useEffect(() => {
    if (checkedDefault)
      setAddNewAddress((curr) => ({
        ...curr,
        is_default: 1,
      }));
    else
      setAddNewAddress((curr) => ({
        ...curr,
        is_default: 0,
      }));
  }, [checkedDefault, setAddNewAddress]);

  // const handleSelectCode = (code) => {
  //   setCode(code.code);
  //   setShowPhoneCode(false);
  // };

  const handleCancel = () => {
    setDeliveryAddress(false);
    setAddNewAddress({
      is_default: 0,
      first_name: "",
      last_name: "",
      phone_number: "",
      address: "",
      country: 161, // default value
      state: null,
      lg: null,
      city: "",
      address_type_id: 1,
    });
    setGetStateOption("");
    setGetLocalGovtOption("");
    setSelectedState({});
    setSelectedLocalGovt({});
    setCheckedDefault(false);
    setShippingErr("");
    setCode("");
  };

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
        console.log(error);
      });
  }, []);

  // function to get local government
  useEffect(() => {
    if (!selectedState.id) return;
    axios({
      url: `${baseUrl}/locations/state/${selectedState?.id}`,
      method: "GET",
    })
      .then((resp) => {
        setLocalGovt(resp.data.data.lgs);
      })
      .catch((error) => console.log(error));
  }, [selectedState]);

  // function to get cities
  useEffect(() => {
    if (!selectedState.isoCode) return;

    axios({
      url: `${baseUrl}/locations/states/cities/${selectedState?.isoCode}`,
      method: "GET",
    })
      .then((resp) => {
        setCities(resp.data.data.cities);
      })
      .catch((error) => console.log(error));
  }, [selectedState]);

  // function to get address types
  useEffect(() => {
    axios({
      url: `${baseUrl}/address/types`,
      method: "GET",
    })
      .then((resp) => {
        setAddressType(resp.data.data.address_types);
      })
      .catch((err) => console.log(err));
  }, []);

  // function to handle address type change
  const handleChangeAddressType = (e) => {
    const selTypeOfAddress = addressType.find(
      (typeOfAddress) => typeOfAddress.name === e.target.value
    );
    setChangeAddressType(selTypeOfAddress.name);
    setAddNewAddress({
      ...addNewAddress,
      address_type_id: selTypeOfAddress.id,
    });
  };

  // function to get the state id of the state selected
  const handleStateChange = (e) => {
    const getState = e.target.value;
    setGetStateOption(getState);
    if (getState) {
      const selState = states.find((state) => state.name === getState);
      setSelectedState(selState);
      setAddNewAddress({
        ...addNewAddress,
        state: selState?.id,
      });
    } else setSelectedState({});
  };

  // function to get the local government selected
  const handleLocalGovtChange = (e) => {
    const getLocalGovt = e.target.value;
    setGetLocalGovtOption(getLocalGovt);
    if (getLocalGovt) {
      const selLocalGovt = localGovt.find((lgs) => lgs.name === getLocalGovt);
      setSelectedLocalGovt(selLocalGovt);
      setAddNewAddress({
        ...addNewAddress,
        lg: selLocalGovt?.id,
      });
    } else setSelectedLocalGovt({});
  };

  // function to get the local government selected
  const handleCityChange = (e) => {
    if (e.target.value) {
      const selCity = cities.find((city) => +city.id === +e.target.value);
      setSelectedCity(selCity);
      setAddNewAddress({
        ...addNewAddress,
        city: selCity?.name,
      });
    } else setSelectedCity({});
  };

  // function to add new address
  const addAddress = () => {
    const isShippingAddressEmpty = Object.values(addNewAddress).every(
      (val) => val !== "" && val !== null
    );

    if (!isShippingAddressEmpty)
      return setShippingErr("All inputs must be filled");

    addAddressRef.current.innerHTML = `<span class="fas fa-spinner fa-spin">Adding...</span>`;
    addAddressRef.current.setAttribute("disabled", "disabled");

    axios({
      url: `${baseUrl}/accounts/delivery/address`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        ...addNewAddress,
        phone_number: `+234${addNewAddress.phone_number}`,
      }),
    })
      .then((response) => {
        setDeliveryAddress(false);

        // dispatching the new address to be used as delivery address
        if (path !== "/dashboard/delivery_address") {
          const newAddressAdded = response.data.data.delivery_address;
          // add response here
          dispatch(setNewAddedAddressForDelivery(newAddressAdded));
        }

        setAlertStatus("success");
        setAlertMsg(response.data.data.message);
        setShowAlert(true);

        return axios({
          url: `${baseUrl}/accounts/delivery/addresses`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((resp) => {
        const addressesFetched = resp.data.data.delivery_addresses.data;
        setAllAddress(addressesFetched);
        const link = resp.data.data.delivery_addresses.links;
        setLinks(link);
        // storing default address into the global storage here
        dispatch(
          setDefaultAddress(
            addressesFetched.find((address) => address.is_default === 1)
          )
        );
      })
      .catch((error) => {
        setAlertStatus("error");
        setAlertMsg(error.response.data.message);
        setShowAlert(true);
      });
    addAddressRef.current.removeAttribute("disabled", "disabled");
    addAddressRef.current.innerHTML = "Save Address";

    setAddNewAddress({
      is_default: 0,
      first_name: "",
      last_name: "",
      phone_number: "",
      address: "",
      country: 161, // default value
      state: null,
      lg: null,
      city: "",
      address_type_id: 1,
    });
    setGetStateOption("");
    setGetLocalGovtOption("");
    setSelectedState({});
    setSelectedLocalGovt({});
    setCheckedDefault(false);
  };

  return (
    <div className={"delivery " + (shipping ? "" : "none")}>
      <div className="shipping__address">
        <div className="register">
          <div className="register__name">
            <div className="inputs__select">
              <label htmlFor="first_name" className="names">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="mary"
                onChange={handleChange}
                value={addNewAddress?.first_name}
              />
              {errorMessage.first_name && (
                <p className="error__messages">{errorMessage.first_name}</p>
              )}
            </div>
            <div className="inputs__select">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Williams"
                onChange={handleChange}
                value={addNewAddress?.last_name}
              />
              {errorMessage.last_name && (
                <p className="error__messages">{errorMessage.last_name}</p>
              )}
            </div>
          </div>
          <div className="address__type">
            <div className="add__shipping__address">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                placeholder="3, jericho estate, Ibadan (maximum length of 45 characters)"
                onChange={handleChange}
                value={addNewAddress?.address}
              />
              {errorMessage.address && (
                <p className="error__messages">{errorMessage.address}</p>
              )}
            </div>
            <div className="add__type__address">
              <label htmlFor="addresstype">Type of Address</label>
              <select
                name="addresstype"
                onChange={handleChangeAddressType}
                value={changeAddressType}
              >
                {addressType?.map((typeAddress) => (
                  <option value={typeAddress.name} key={typeAddress.id}>
                    {typeAddress.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="choose__location">
            <div className="inputs__select country__option">
              <label htmlFor="address">Country</label>
              <select name="country">
                <option value="nigeria">Nigeria</option>
              </select>
            </div>
            <div className="inputs__select">
              <label htmlFor="address">State</label>
              <select
                name="state"
                onChange={handleStateChange}
                value={getStateOption !== "" && selectedState.name}
              >
                <option value="">Select State</option>
                {states?.map((state) => (
                  <option value={state.name} key={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputs__select">
              <label htmlFor="address">Local Government Area</label>
              <select
                name="lg"
                onChange={handleLocalGovtChange}
                value={getStateOption !== "" && selectedLocalGovt.name}
                disabled={!selectedState.id}
              >
                <option name="">Select Local Govt.</option>
                {localGovt &&
                  localGovt.map((localGovtState) => (
                    <option value={localGovtState.name} key={localGovtState.id}>
                      {localGovtState.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="inputs__select">
              <label htmlFor="city">City</label>
              <select
                name="lg"
                onChange={handleCityChange}
                value={getLocalGovtOption !== "" && selectedCity.id}
                disabled={!selectedState.id}
              >
                <option name="">Select City.</option>
                {cities &&
                  cities.map((city) => (
                    <option value={city.id} key={city.id}>
                      {city.name}
                    </option>
                  ))}
              </select>
              {errorMessage.city && (
                <p className="error__messages">{errorMessage.city}</p>
              )}
            </div>
          </div>
          <div className="phone">
            <label htmlFor="number">Phone Number</label>
            <div className="country__code">
              <div
                className="codes"
                onClick={() => setShowPhoneCode(!showPhoneCode)}
              >
                <img src={flag} alt="" className="" />
                <p>{code === "" ? "+234" : code}</p>
                <ion-icon name="chevron-down-outline"></ion-icon>
              </div>
              {/* {showPhoneCode && (
                <div className="other__codes">
                  <ul>
                    {countryCode.map((code, i) => (
                      <li
                        key={i}
                        className="codes code__dropdown"
                        onClick={() => handleSelectCode(code)}
                      >
                        <img src={flag} alt="flag" />
                        <p>+234</p>
                        <ion-icon
                          name="chevron-down-outline"
                          style={{ visibility: "hidden" }}
                        ></ion-icon>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}
              <div className="country__input">
                <input
                  type="text"
                  placeholder="8012345678"
                  name="phone_number"
                  onChange={handleChange}
                  value={addNewAddress?.phone_number}

                  // value={addNewAddress?.phone_number.length === 11 ? `+234${addNewAddress?.phone_number}` : addNewAddress?.phone_number}
                />
              </div>
            </div>
            {errorMessage.phone_number && (
              <p className="error__messages">{errorMessage.phone_number}</p>
            )}
          </div>
        </div>
        <div className="shipping__address_err">
          {shippingErr && <i>{shippingErr}</i>}
        </div>
        <div className="check">
          <div className="all__checkboxes">
            <div className="check__boxes">
              <input
                id="checkbox-default"
                type="checkbox"
                className="checkbox"
                onChange={() => setCheckedDefault(!checkedDefault)}
                value={checkedDefault}
                checked={checkedDefault}
              />
              <label htmlFor="checkbox-default" className="check__save">
                Use as default
              </label>
            </div>
          </div>
        </div>
        <div className="btn__addresses">
          <button
            className="save__address"
            onClick={addAddress}
            ref={addAddressRef}
          >
            Save Address
          </button>
          <button className="cancel__address" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
