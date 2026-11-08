// import of packages

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useSearchParams, useLocation } from "react-router-dom";

// import of images
import { logout } from "../store/slices/authSlice";
import UserVerify from "./UserVerify";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const activeTabOrder = searchParams.get("tab") || "all";

  const activeSort = searchParams.get("sort") || "all";

  const dispatch = useDispatch();

  const [subMenu, setSubMenu] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/dashboard/orders") {
      setSubMenu(false);
    }
  }, [location.pathname]);

  const handleOrder = () => {
    setSubMenu(!subMenu);
  };

  const handleSignOut = () => {
    dispatch(
      logout({
        accessToken: null,
        userDetails: null,
      })
    );
    localStorage.removeItem("app_state");
    window.location.reload();
  };

  return (
    <div className="sidebar" id="outlet-container">
      <UserVerify />
      <ul className="menu__list">
        <li>
          <NavLink
            to="/dashboard"
            className={`${({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""} menu__list__item`}
            end
          >
            My Wallet
          </NavLink>
        </li>
        <li>
          <NavLink
            to="my-account"
            className={`${({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""} menu__list__item`}
          >
            My Account
          </NavLink>
        </li>
        <li className="has__sublist">
          <NavLink
            to="orders"
            className={`${({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""} menu__list__item `}
            onClick={handleOrder}
          >
            <div className="orders__menu">
              Orders
              {subMenu ? (
                <ion-icon name="chevron-down-sharp"></ion-icon>
              ) : (
                <ion-icon name="chevron-forward-outline"></ion-icon>
              )}
            </div>
          </NavLink>
          <ul className={`${subMenu ? "openMenu" : "closeMenu"} sublist__menu`}>
            <li className="">
              <Link
                to={`orders?tab=PENDING&sort=${activeSort}`}
                className={`${
                  activeTabOrder === "PENDING" ? "active" : ""
                } menu__list__item sublist`}
              >
                Pending orders
              </Link>
            </li>
            <li className="">
              <Link
                to={`orders?tab=PROCESSING&sort=${activeSort}`}
                className={`${
                  activeTabOrder === "PROCESSING" ? "active" : ""
                } menu__list__item sublist`}
              >
                Processing orders
              </Link>
            </li>
            <li className="">
              <Link
                to={`orders?tab=SHIPPED&sort=${activeSort}`}
                className={`${
                  activeTabOrder === "SHIPPED" ? "active" : ""
                } menu__list__item sublist`}
              >
                Shipped orders
              </Link>
            </li>
            <li className="">
              <Link
                to={`orders?tab=DELIVERED&sort=${activeSort}`}
                className={`${
                  activeTabOrder === "DELIVERED" ? "active" : ""
                } menu__list__item sublist`}
              >
                Delivered orders
              </Link>
            </li>
            <li className="">
              <Link
                to={`orders?tab=CANCELLED&sort=${activeSort}`}
                className={`${
                  activeTabOrder === "CANCELLED" ? "active" : ""
                } menu__list__item sublist`}
              >
                Cancelled orders
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="delivery_address"
            className={`${({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""} menu__list__item`}
          >
            Delivery Address
          </NavLink>
        </li>

        <li>
          <NavLink
            to="saved-items"
            className={`${({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""} menu__list__item`}
          >
            Saved Items
          </NavLink>
        </li>

        <li>
          <NavLink
            to="reviews"
            className={`${({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""} menu__list__item`}
          >
            Reviews
          </NavLink>
        </li>

        <li>
          <NavLink
            to="recently-viewed"
            className={`${({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                ? "pending"
                : ""} menu__list__item`}
          >
            Recently Viewed
          </NavLink>
        </li>
        <li className="menu__list__item" onClick={handleSignOut}>
          Sign out
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
