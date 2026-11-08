import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import OrderedItem from "../components/OrderedItem";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../libries";
import { setOrders } from "../store/slices/orderSlice";
import Empty from "../components/Empty";

import processing from "../assets/imgs/icons/processing.svg";
import cancelled from "../assets/imgs/icons/cancelled.svg";
import delivered from "../assets/imgs/icons/delivered.svg";
import shipped from "../assets/imgs/icons/shipped.svg";
import pending from "../assets/imgs/icons/pending.svg";
import allOrders from "../assets/imgs/allOrders.svg";
import Pagination from "../components/Pagination";

const tabs = [
  {
    iconTab: allOrders,
    active: "all",
    tabName: "All orders",
  },
  {
    iconTab: pending,
    active: "PENDING",
    tabName: "Pending orders",
  },
  {
    iconTab: processing,
    active: "PROCESSING",
    tabName: "Processing orders",
  },
  {
    iconTab: shipped,
    active: "SHIPPED",
    tabName: "Shipped orders",
  },
  {
    iconTab: delivered,
    active: "DELIVERED",
    tabName: "Delivered orders",
  },
  {
    iconTab: cancelled,
    active: "CANCELLED",
    tabName: "Cancelled orders",
  },
];

const Order = () => {
  const token = useSelector((state) => state.auth.accessToken);

  const dispatch = useDispatch();
  // state to store orders
  const [allOrders, setAllOrders] = useState(null);

  // stating state to get params to filter according to tabs
  const [searchParams, setSearchParams] = useSearchParams();

  // state to set active order tab
  const activeOrderTab = searchParams.get("tab") || "all";

  // state to sort order
  let activeSort = searchParams.get("sort") || "all";

  // state for custom selection of orders
  const customSort = {
    start: searchParams.get("start") || "",
    end: searchParams.get("end") || "",
  };

  // state for pagination links
  const [links, setLinks] = useState(null);

  const [lastPage, setLastPage] = useState(null);

  // pagination implementation with the backend functionality
  const [url, setUrl] = useState(
    `${baseUrl}/orders/${activeOrderTab}/${activeSort}`
  );

  // state to track loading state
  const [loading, setLoading] = useState(true);

  // state to hold number of items per page
  const [perPage, setPerPage] = useState(null);

  // function to get the tab selected
  const handleClickTab = (tab) => {
    setSearchParams((sp) => {
      sp.set("tab", tab);

      return sp;
    });
  };

  const setSort = (sort) => {
    setSearchParams((sp) => {
      sp.set("sort", sort);

      return sp;
    });
  };

  const isCustomEmpty = Object.values(customSort).every((val) => val !== "");

  // function to get the sort option selected
  const handleChangeSort = (e) => {
    const changedSort = e.target.value;

    if (changedSort !== "custom") {
      setSearchParams((sp) => {
        sp.delete("start");
        sp.delete("end");

        return sp;
      });
    }
    setSort(changedSort);
  };

  const handleChangeCustomSort = (e) => {
    const { name, value } = e.target;
    setSearchParams((sp) => {
      sp.set(name, value);

      return sp;
    });
  };

  // state to catch network error
  const [networkError, setNetworkError] = useState(false);

  // showing alert states
  const [alertMsg, setAlertMsg] = useState("");

  // fetching orders
  useEffect(() => {
    setLoading(true);
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
        const ordersFetched = resp.data.data.orders.data;
        const ordersPaginateLinks = resp.data.data.orders.meta.links;
        setAllOrders(ordersFetched);
        setLinks(ordersPaginateLinks);
        setPerPage(resp.data.data.orders.meta.per_page);
        setLastPage(resp.data.data.orders.meta.last_page);

        dispatch(setOrders(ordersFetched));
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
  }, [url, dispatch, token]);

  // destructuring start and end for custom
  const { start, end } = customSort;

  useEffect(() => {
    if (activeSort === "custom") {
      if (isCustomEmpty) {
        setUrl(
          `${baseUrl}/orders/${activeOrderTab}/${activeSort}?start=${start}&end=${end}`
        );
      }
    } else {
      setUrl(`${baseUrl}/orders/${activeOrderTab}/${activeSort}`);
    }
  }, [activeSort, isCustomEmpty, start, end, activeOrderTab]);

  return (
    <div className="orders">
      <div className="fixed__head">
        <DashboardHeader title="Orders" isIcon="false" />
        <div className="orders__tabs">
          {tabs.map((tab, index) => (
            <div
              className={`${tab.active === activeOrderTab ? "active" : ""} tab`}
              key={index}
              onClick={() => handleClickTab(tab.active)}
            >
              <img src={tab.iconTab} alt="tab icons" />
              <span>{tab.tabName}</span>
            </div>
          ))}
        </div>
        <div className="orders__search">
          <div className="filter__order">
            <label htmlFor="filter-order">Sort by: </label>
            <select name="sort" onChange={handleChangeSort} value={activeSort}>
              <option value="all">All</option>
              <option value="daily">Today</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="last_month">Last Month</option>
              {/* <option value="year">This Year</option> */}
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
        {activeSort === "custom" && (
          <div className="custom__show">
            <div className="custom__sort">
              <div className="date__box">
                <div className="date__box__input">
                  <label>Start date</label>
                  <input
                    type="date"
                    name="start"
                    value={customSort.start}
                    onChange={handleChangeCustomSort}
                  />
                </div>
                <div className="date__box__input">
                  <label>End date</label>
                  <input
                    type="date"
                    name="end"
                    value={customSort.end}
                    onChange={handleChangeCustomSort}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="orders__content">
        {loading && (
          <div className="loading__spin__address">
            <span className="loader"></span>
          </div>
        )}
        {!loading && !networkError && allOrders && !allOrders.length && (
          <Empty
            emptyTitle="No orders"
            emptySubTitle="Browse our categories and start ordering!"
          />
        )}

        {!loading && networkError && (
          <Empty
            emptyTitle={alertMsg}
            emptySubTitle="Something went wrong! TRY AGAIN.."
            network={true}
          />
        )}

        <div className="items__list">
          {!loading &&
            !networkError &&
            allOrders &&
            allOrders.map((order) => <OrderedItem order={order} />)}
        </div>
      </div>
      {!loading &&
        (allOrders?.length >= perPage || lastPage !== 1) &&
        !networkError && <Pagination links={links} setUrl={setUrl} />}
    </div>
  );
};

export default Order;
