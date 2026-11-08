import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../libries";
import {
  setDefaultAddress,
  setDeliverToAddress,
} from "../store/slices/addressSlice";
import ShippingAddress from "./ShippingAddress";
import Pagination from "./Pagination";
import Empty from "./Empty";

// images import
import plus from "../../src/assets/imgs/icons/plus-add.svg";

const AvailableAddresses = ({ title, setChangeAddress }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.accessToken);
  const path = location.pathname;

  const [allAddress, setAllAddress] = useState(null);

  // showing alert states
  const [, setShowAlert] = useState(false);
  const [, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  // get how to make some props optional in javascript

  // state to save address
  const [addNewAddress, setAddNewAddress] = useState({
    is_default: 0,
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    country: 161,
    state: null,
    lg: null,
    city: "",
    address_type_id: 1,
  });

  // state to show add delivery address on button click
  const [deliveryAddress, setDeliveryAddress] = useState(false);

  // state to track loading state
  const [loading, setLoading] = useState(true);

  // state to set pagination links
  const [links, setLinks] = useState(null);

  // state to get the last page
  const [lastPage, setLastPage] = useState(null);

  // state to filter delivery address by search
  const [filterAddressesBySearch, setFilterAddressesBySearch] = useState(null);

  // state to hold number of items per page
  const [perPage, setPerPage] = useState(null);

  // state to hold inputs for filtering addresses
  const [inputFilter, setInputFilter] = useState("");

  // state to catch network error
  const [networkError, setNetworkError] = useState(false);

  // function to filter delivery addresses by search
  const handleSearchAddresses = (e) => {
    const inputSearch = e.target.value;
    setInputFilter(inputSearch);
    if (inputSearch)
      setFilterAddressesBySearch(
        allAddress?.filter((textInput) => {
          setLoading(false);
          return (
            textInput.address
              .toLowerCase()
              .indexOf(inputSearch.toLowerCase()) !== -1
          );
        })
      );
  };

  // pagination implementation with the backend functionality
  const [url, setUrl] = useState(`${baseUrl}/accounts/delivery/addresses`);

  // getting all addresses
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
        const addressesFetched = resp.data.data.delivery_addresses.data;
        setAllAddress(addressesFetched);
        const link = resp.data.data.delivery_addresses.links;
        setLinks(link);
        setPerPage(resp.data.data.delivery_addresses.per_page);
        setLastPage(resp.data.data.delivery_addresses.last_page);
        setLoading(false);
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setAlertMsg(err.response.data.message);
        } else {
          setNetworkError(true);
          setAlertMsg(err.message);
        }
      });
  }, [url, token]);

  const handleSelectDeliverToAddress = (id) => {
    const selectAddress = allAddress.find((address) => address.id === id);
    dispatch(setDeliverToAddress(selectAddress));
    setChangeAddress(false);
  };

  const handleSelectDefaultAddress = (id) => {
    axios({
      url: `${baseUrl}/accounts/change/default/address`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({ id }),
    })
      .then((resp) => {
        // make another axios call to fetch all addresses to update the display
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

        // storing default address into the global storage here
        dispatch(
          setDefaultAddress(
            addressesFetched.find((address) => address.is_default === 1)
          )
        );
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });

    setChangeAddress(false);
  };

  return (
    <div id="overflow-contain" className="show__available__address">
      <div className="available__address">
        <div className="add__pad__available">
          <div className="available__address__sticky">
            <ion-icon
              onClick={() => setChangeAddress()}
              name="close-circle-outline"
            ></ion-icon>
            <div className="address__title">
              <h3>{title}</h3>
            </div>
            <div className="search__sort__address">
              <div className="delivery__search__available">
                <div className="search__delivery">
                  <ion-icon name="search-outline"></ion-icon>
                  <input
                    type="text"
                    placeholder="Search by address"
                    value={inputFilter}
                    onChange={handleSearchAddresses}
                  />
                </div>
              </div>
              <div
                className="add__new__address"
                onClick={() => setDeliveryAddress(true)}
              >
                <img src={plus} alt="add" className="add__new__plus" />
                <span className="add__new">Add new</span>
              </div>
            </div>
          </div>
          <ShippingAddress
            shipping={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            setAddNewAddress={setAddNewAddress}
            addNewAddress={addNewAddress}
            setAllAddress={setAllAddress}
            setShowAlert={setShowAlert}
            setAlertStatus={setAlertStatus}
            setAlertMsg={setAlertMsg}
            setLinks={setLinks}
          />
          {loading && (
            <div className="loading__spin__address">
              <span class="loader"></span>
            </div>
          )}
          <div className="addresses available">
            {!loading && !networkError && filterAddressesBySearch && inputFilter
              ? filterAddressesBySearch.map((addresses) => (
                  <div className="addresses__item" key={addresses.id}>
                    <div className="select__address__details">
                      <div className="address__info">
                        <span>
                          {addresses.first_name} {addresses.last_name}
                        </span>
                        <span>{addresses.phone_number}</span>
                      </div>
                      {path === "/dashboard/delivery_address" && (
                        <button
                          className="select__address"
                          onClick={() =>
                            handleSelectDefaultAddress(addresses.id)
                          }
                        >
                          select address
                        </button>
                      )}
                      {path !== "/dashboard/delivery_address" && (
                        <button
                          className="select__address"
                          onClick={() =>
                            handleSelectDeliverToAddress(addresses.id)
                          }
                        >
                          select address
                        </button>
                      )}
                    </div>
                    <p>{addresses.address}</p>
                  </div>
                ))
              : !loading &&
                allAddress &&
                !networkError &&
                allAddress.map((addresses) => (
                  <div className="addresses__item" key={addresses.id}>
                    <div className="select__address__details">
                      <div className="address__info">
                        <span>
                          {addresses.first_name} {addresses.last_name}
                        </span>
                        <span>{addresses.phone_number}</span>
                      </div>
                      {path === "/dashboard/delivery_address" && (
                        <button
                          className="select__address"
                          onClick={() =>
                            handleSelectDefaultAddress(addresses.id)
                          }
                        >
                          select address
                        </button>
                      )}
                      {path !== "/dashboard/delivery_address" && (
                        <button
                          className="select__address"
                          onClick={() =>
                            handleSelectDeliverToAddress(addresses.id)
                          }
                        >
                          select address
                        </button>
                      )}
                    </div>
                    <p>{addresses.address}</p>
                  </div>
                ))}
            {!loading && !networkError && !allAddress?.length && (
              <p>No Address added</p>
            )}
          </div>
          {!loading && networkError && (
            <Empty
              emptyTitle={alertMsg}
              emptySubTitle="Something went wrong! TRY AGAIN.."
              network={true}
            />
          )}
        </div>
        {!loading &&
          (allAddress?.length >= perPage || lastPage !== 1) &&
          !networkError && <Pagination links={links} setUrl={setUrl} />}
      </div>
    </div>
  );
};

export default AvailableAddresses;
