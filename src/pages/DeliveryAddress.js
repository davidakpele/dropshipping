import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShippingAddress from "../components/ShippingAddress";
import AvailableAddresses from "../components/AvailableAddresses";
import DashboardHeader from "../components/DashboardHeader";
import axios from "axios";
import { baseUrl } from "../libries";
import Empty from "../components/Empty";
import ConfirmDelete from "../components/ConfirmDelete";
import Pagination from "../components/Pagination";
import { setDefaultAddress } from "../store/slices/addressSlice";
import { removeDefaultAddress } from "../store/slices/addressSlice";
import { axiosInstance } from "../libries";

// import images
import deleteIcon from "../assets/imgs/icons/delete.svg";
import Alert from "../components/Alert";

const DeliveryAddress = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const defaultAddress = useSelector((state) => state.address.defaultAddress);

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

  // state to show change address pop up
  const [changeAddress, setChangeAddress] = useState(false);

  // pagination implementation with the backend functionality
  const [url, setUrl] = useState(`${baseUrl}/accounts/delivery/addresses`);

  // state for all addresses
  const [allAddress, setAllAddress] = useState(null);

  // state to track loading state
  const [loading, setLoading] = useState(true);

  // showing popup for confirmDelete balance
  const [confirmDelete, setConfirmDelete] = useState(false);

  // state to catch network error
  const [networkError, setNetworkError] = useState(false);

  // showing alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [delAddressId, setDelAddressId] = useState(null);

  // state to hold number of items per page
  const [perPage, setPerPage] = useState(null);

  // state to filter delivery address by search
  const [filterAddressesBySearch, setFilterAddressesBySearch] = useState(null);

  // function to close confirm delete popup
  const handleYes = () => {
    handleDeleteAddress();
    setConfirmDelete(false);
  };

  const handleNo = () => {
    setConfirmDelete(false);
  };

  const handleConfirmDeleteAddress = (id) => {
    setConfirmDelete(true);
    setDelAddressId(id);
  };

  // function to delete delivery address
  const handleDeleteAddress = () => {
    if (delAddressId === defaultAddress?.id) dispatch(removeDefaultAddress());

    axios({
      url: `${baseUrl}/accounts/delete-delivery-address/${delAddressId}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        setAlertStatus("success");
        setAlertMsg(resp.data.data.message);
        setShowAlert(true);

        // make another axios call to fetch all addresses to update the display
        return axios({
          url,
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
      });
  };

  const [links, setLinks] = useState(null);

  const [lastPage, setLastPage] = useState(null);

  // fetching default address here
  useEffect(() => {
    axiosInstance(token)
      .get(`${baseUrl}/accounts/default/delivery/address`)
      .then((resp) => {
        const defaultAdd = resp.data.data.delivery_addresses;
        dispatch(setDefaultAddress(defaultAdd));

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // getting all addresses
  useEffect(() => {
    // setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }, [url, dispatch, token]);

  // state to hold inputs for filtering addresses
  const [inputFilter, setInputFilter] = useState("");

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
  return (
    <>
      <div className="delivery__address">
        <DashboardHeader title="Delivery Address" isIcon="false" />
        <div className="default">
          <div className="default__address">
            <p className="default__address__headline">Default Address</p>
            {defaultAddress ? (
              <>
                <div className="default__address__info">
                  <span className="default__address__info__name">
                    {defaultAddress.first_name + " " + defaultAddress.last_name}
                  </span>
                  <span className="default__address__info__phone">
                    {defaultAddress.phone_number}
                  </span>
                </div>
                <span className="default__address__street">
                  {defaultAddress.address}
                </span>
              </>
            ) : (
              <p>No default address yet</p>
            )}
          </div>
          <button
            className={`${
              defaultAddress ? "active__change__delivery" : "disabled__delivery"
            } default__address__btn`}
            onClick={() => setChangeAddress(true)}
          >
            Change default address
          </button>
        </div>
        <div className="search__sort__address">
          <div className="sort__with__custom">
            <div className="delivery__search">
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
          </div>
          <button
            className={`${deliveryAddress ? "disabled" : ""} new__delivery`}
            onClick={() => setDeliveryAddress(true)}
          >
            <ion-icon name="add-sharp"></ion-icon> Add new delivery address
          </button>
        </div>
        <ShippingAddress
          shipping={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
          setAddNewAddress={setAddNewAddress}
          addNewAddress={addNewAddress}
          setShowAlert={setShowAlert}
          setAlertStatus={setAlertStatus}
          setAlertMsg={setAlertMsg}
          setAllAddress={setAllAddress}
          setLinks={setLinks}
        />
        <>
          {loading && (
            <div className="addresses">
              {new Array(12).fill(null).map((_, i) => (
                <AddressLoader key={i} />
              ))}
            </div>
          )}

          {!loading && networkError && (
            <Empty
              emptyTitle={alertMsg}
              emptySubTitle="Something went wrong! TRY AGAIN.."
              network={true}
            />
          )}

          <div className="addresses">
            {!loading && filterAddressesBySearch && !networkError && inputFilter
              ? filterAddressesBySearch.map((addresses) => (
                  <div className="addresses__item" key={addresses.id}>
                    <div className="addresses__item__details">
                      <span>
                        {addresses.first_name} {addresses.last_name}
                      </span>
                      <span>{addresses.phone_number}</span>
                      <p>{addresses.address}</p>
                    </div>
                    <img
                      src={deleteIcon}
                      className="delete__icon"
                      alt="delete icon"
                      onClick={() => handleConfirmDeleteAddress(addresses.id)}
                    />
                  </div>
                ))
              : !loading && allAddress?.length && !networkError
              ? allAddress?.map((addresses) => (
                  <div className="addresses__item" key={addresses.id}>
                    <div className="addresses__item__details">
                      <span>
                        {addresses.first_name} {addresses.last_name}
                      </span>
                      <span>{addresses.phone_number}</span>
                      <p>{addresses.address}</p>
                    </div>
                    <img
                      src={deleteIcon}
                      className="delete__icon"
                      alt="delete icon"
                      onClick={() => handleConfirmDeleteAddress(addresses.id)}
                    />
                  </div>
                ))
              : null}
          </div>

          {!loading && !networkError && !allAddress?.length && (
            <Empty
              emptyTitle="You have no saved addresses yet!"
              emptySubTitle=""
            />
          )}
        </>
        {!loading &&
          (allAddress?.length >= perPage || lastPage !== 1) &&
          !networkError && <Pagination links={links} setUrl={setUrl} />}
        {confirmDelete && (
          <ConfirmDelete handleNo={handleNo} handleYes={handleYes} />
        )}
        {changeAddress && (
          <AvailableAddresses
            title="Change default address"
            setChangeAddress={setChangeAddress}
          />
        )}
      </div>
      {showAlert && (
        <Alert
          alertMsg={alertMsg}
          alertStatus={alertStatus}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

export default DeliveryAddress;

const AddressLoader = () => (
  <div className="addresses__item">
    <div className="addresses__item__details">
      <span className="placeholder">something very very long</span>
      <span className="placeholder">soething</span>
      <p className="placeholder">2, Wiseki Drive Albarka</p>
    </div>
    <div className="delete__icon placeholder">hii</div>
  </div>
);
