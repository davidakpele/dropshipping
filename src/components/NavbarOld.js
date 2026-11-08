import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import axios from "axios";
import Notification from "../pages/Notification";

// images
import shopnig from "../assets/imgs/shopnig.png";
import { baseUrl, currency_formarter } from "../libries";
import wallet from "../assets/imgs/icons/wallet.svg";
import laptop from "../assets/imgs/icons/laptop-02.svg";
import phone from "../assets/imgs/icons/phone-01.svg";
import speaker from "../assets/imgs/icons/speaker-03.svg";
import game from "../assets/imgs/icons/gaming-pad-01.svg";
import webcam from "../assets/imgs/icons/webcam-02.svg";
import flash from "../assets/imgs/icons/usb-flash-drive.svg";
import other from "../assets/imgs/icons/gaming-pad-02.svg";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userDetails);
  const cartCount = useSelector((state) => state.cart.carts.length);
  const token = useSelector((state) => state.auth.accessToken);
  const [catItem, setCatItem] = useState([]);
  const [wallets, setWallet] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [notice, setNotification] = useState(false);

  useEffect(() => {
    axios({
      url: `${baseUrl}/accounts/wallet`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setWallet(response.data.data.wallet);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${baseUrl}/categories/numbered`)
      .then((resp) => setCatItem(resp.data.data.numbered_categories))
      .catch((e) => console.log(e));
  }, [token]);

  const logOut = () => {
    dispatch(
      logout({
        accessToken: null,
        userDetails: null,
      })
    );
  };

  const toggleNotification = () => {
    setNotification(!notice);
  };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar__wrap">
          <div className="navbar__menu">
            <ion-icon
              name="menu-outline"
              onClick={() => setToggle(!toggle)}
            ></ion-icon>
          </div>
          <div className="navbar__logo">
            <Link to="/">
              <img src={shopnig} alt="logo" />
            </Link>
          </div>
          <div className="navbar__search">
            <div className="search">
              <div className="search__itm">
                <div className="search__search">
                  <ion-icon name="search-outline"></ion-icon>
                  <input type="text" placeholder="Serch for product" />
                </div>
                <div className="search__category">
                  <p>All Categories</p>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
              </div>
              <div className="btn btn-primary">Search</div>
              <div className="food"></div>
            </div>
          </div>
          <div className="navbar__nav">
            <ul>
              <li className="navbar__navItem navbar__account dropdown">
                {user ? (
                  <ion-icon
                    name="notifications-outline"
                    onClick={toggleNotification}
                  ></ion-icon>
                ) : (
                  <Link to="/login">
                    <ion-icon name="person-outline"></ion-icon>
                  </Link>
                )}{" "}
                <span className="navbar__name">
                  {user ? `Hi, ${user.first_name}` : "My Account"}
                </span>
                <span className="chevron-down-outline">
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </span>
                <div className="dropdown__content">
                  <Link className="dropdown__link" to="/dashboard">
                    My wallet
                  </Link>
                  <Link className="dropdown__link" to="/dashboard/myaccount">
                    My Account
                  </Link>
                  <Link className="dropdown__link" to="/dashboard/orders">
                    Orders
                  </Link>
                  <Link
                    className="dropdown__link"
                    to="/dashboard/delivery_address"
                  >
                    Delivery Address
                  </Link>
                  <Link className="dropdown__link" to="/dashboard/saved-items">
                    Saved Item
                  </Link>
                  <Link className="dropdown__link" to="/dashboard/reviews">
                    Reviews
                  </Link>
                  <Link
                    className="dropdown__link"
                    to="/dashboard/recently-viewed"
                  >
                    Recently viewed
                  </Link>
                  <div className="dropdown__link">
                    <button
                      onClick={logOut}
                      className={
                        "btn btn-block " +
                        (user ? "btn-lightgrey" : "btn-primary")
                      }
                    >
                      {user ? (
                        <span className="text-danger">Log out</span>
                      ) : (
                        <span className="text-white">
                          <Link to="/login">Login</Link>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </li>
              <li className="navbar__navItem navbar__help dropdown">
                <ion-icon name="help-circle-outline"></ion-icon>{" "}
                <span className="navbar__name">Help</span>
                <span className="chevron-down-outline">
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </span>
                <div className="help__dropdown">
                  <Link to="/faq" className="dropdown__link">
                    FAQ
                  </Link>
                  <Link to="/about-us" className="dropdown__link">
                    About us
                  </Link>
                  <Link to="/contact-us" className="dropdown__link">
                    Contact us
                  </Link>
                  <Link to="/refund-policy" className="dropdown__link">
                    Refund policy
                  </Link>
                  <Link to="/terms-condition" className="dropdown__link ">
                    Terms and condition
                  </Link>
                  <Link to="/privacy-policy" className="dropdown__link">
                    Privacy policy
                  </Link>
                </div>
              </li>
              <Link to="/cart">
                <li className="navbar__navItem navbar__cart">
                  <span className="cart-outline">
                    <ion-icon name="cart-outline"></ion-icon>
                    {cartCount ? (
                      <span className="cart__count">{cartCount}</span>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="navbar__name">cart</span>
                </li>
              </Link>
            </ul>
          </div>
          {!user ? (
            <div className="navbar__btn">
              <Link to="/login">
                <button className="btn-navbar border">
                  <ion-icon name="log-out-outline"></ion-icon> Login
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="btn-navbar">
                  <ion-icon name="checkbox-outline"></ion-icon>Register
                </button>
              </Link>
            </div>
          ) : (
            <div className="navbar__wallet">
              <Link to="/dashboard">
                <div className="balance">
                  <img src={wallet} alt="wallet icon" />
                  <p>{currency_formarter(wallets?.available_balance ?? 0)}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className="nav">
          <ul className="categories">
            <div className="categories__item dropdown">
              <ion-icon name="reorder-three-outline"></ion-icon> All categories
              <div className="categories__dropdown">
                <div className="categories__wrap">
                  <div className="categories__main">
                    <Link className="dropdown__link">Laptops & Computers</Link>
                    <Link className="dropdown__link">
                      Smart phones And Tablets
                    </Link>
                    <Link to="" className="dropdown__link">
                      Speakers
                    </Link>
                    <Link to="" className="dropdown__link">
                      Gears
                    </Link>
                    <Link to="" className="dropdown__link">
                      Accessories
                    </Link>
                    <Link to="" className="dropdown__link">
                      Flash Drives
                    </Link>
                    <Link to="" className="dropdown__link">
                      Game & Accessories
                    </Link>
                    <Link to="" className="dropdown__link">
                      Phone Accessories
                    </Link>
                    <Link to="" className="dropdown__link">
                      Other categories
                    </Link>
                  </div>
                  <div className="categories__aside">
                    <div className="categories__sub">
                      <h3>Computers</h3>
                      <Link to="" className="dropdown__link">
                        Desktops
                      </Link>
                      <Link to="" className="dropdown__link">
                        Laptops
                      </Link>
                    </div>
                    <div className="categories__sub">
                      <h3>Antivirus & Security</h3>
                      <Link to="" className="dropdown__link">
                        Antivirus
                      </Link>
                      <Link to="" className="dropdown__link">
                        Internet Security
                      </Link>
                    </div>
                    <div className="categories__sub">
                      <h3>Data Storage</h3>
                      <Link to="" className="dropdown__link">
                        External Hard Drives
                      </Link>
                      <Link to="" className="dropdown__link">
                        USB Flash Drives
                      </Link>
                      <Link to="" className="dropdown__link">
                        Solid State Drive
                      </Link>
                    </div>
                    <div className="categories__sub">
                      <h3>Top Brands</h3>
                      <Link to="" className="dropdown__link">
                        HP
                      </Link>
                      <Link to="" className="dropdown__link">
                        Logitech
                      </Link>
                      <Link to="" className="dropdown__link">
                        Dell
                      </Link>
                      <Link to="" className="dropdown__link">
                        Lenovo
                      </Link>
                      <Link to="" className="dropdown__link">
                        Apple
                      </Link>
                      <Link to="" className="dropdown__link">
                        Samsung
                      </Link>
                      <Link to="" className="dropdown__link">
                        ASUS
                      </Link>
                      <Link to="" className="dropdown__link">
                        Huawei
                      </Link>
                      <Link to="" className="dropdown__link">
                        Toshiba
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {catItem?.map((itm, id) => (
              <Link to="/categories" key={id}>
                <div className="categories__item" key={itm.id}>
                  {itm.name}
                </div>
              </Link>
            ))}
          </ul>

          {user && (
            <p className="notice__icon">
              <ion-icon
                name="notifications"
                onClick={toggleNotification}
              ></ion-icon>
            </p>
          )}
        </div>

        <div className="navbar__searchWrap">
          <div className="mobile__search">
            <span className="search-outline">
              <ion-icon name="search-outline"></ion-icon>
            </span>
            <input
              type="search"
              name=""
              id=""
              placeholder="search for products"
            />
          </div>
        </div>

        {notice && (
          <Notification
            title=""
            setNotification={setNotification}
            close={toggleNotification}
          />
        )}
      </div>
      {toggle && <MobileNav setToggle={() => setToggle(!toggle)} />}
    </nav>
  );
};

export const Navtab = () => (
  <div className="navtab">
    <div className="contain">
      <div className="navtabWrap">
        <div className="navtabWrap__item">
          <ion-icon name="bus-outline"></ion-icon> Nationwide Delivery
        </div>
        <div className="navtabWrap__item">
          <ion-icon name="card-outline"></ion-icon> Pay Bills
        </div>
        <div className="navtabWrap__item">
          <ion-icon name="cart-outline"></ion-icon> Shop accessories
        </div>
        <div className="navtabWrap__item">
          <ion-icon name="phone-portrait-outline"></ion-icon> Gadgets
        </div>
        <div className="navtabWrap__item">
          <ion-icon name="tv-outline"></ion-icon> Brands
        </div>
        <div className="navtabWrap__item">
          <ion-icon name="game-controller-outline"></ion-icon> Games
        </div>
      </div>
    </div>
  </div>
);

export const MobileNav = ({ setToggle }) => {
  const dispatch = useDispatch();
  const [accountToggle, setAccountToggle] = useState(false);
  const [helpToggle, setHelpToggle] = useState(false);
  const user = useSelector((state) => state.auth.userDetails);

  const logOut = () => {
    dispatch(
      logout({
        accessToken: null,
        userDetails: null,
      })
    );
  };

  return (
    <>
      <div className="mobile"></div>
      <div className="mobile__nav">
        <header className="mobile__header">
          <div className="head">
            <div className="mobile__logo">
              <Link to="/">
                <img src={shopnig} alt="logo" />
              </Link>
            </div>
            <span className="close-circle-outline">
              <ion-icon
                name="close-outline"
                onClick={() => setToggle()}
              ></ion-icon>
            </span>
          </div>
          <div className="mobile__wallet">
            <Link to="/dashboard">
              <div className="balance">
                <img src={wallet} alt="wallet icon" />
                <p>{currency_formarter(200000)}</p>
              </div>
            </Link>
          </div>
        </header>
        <div className="mobile__body">
          <div className="mobile__navItem">
            <div
              className="mobile__navLead"
              onClick={() => setAccountToggle(!accountToggle)}
            >
              <span>Hi, Joshua</span>
              <span className="chevron-down-outline">
                {accountToggle ? (
                  <ion-icon
                    name="chevron-up-outline"
                    onClick={() => setAccountToggle(!accountToggle)}
                  ></ion-icon>
                ) : (
                  <ion-icon
                    name="chevron-down-outline"
                    onClick={() => setAccountToggle(!accountToggle)}
                  ></ion-icon>
                )}
              </span>
            </div>
            {accountToggle && (
              <div className="mobile__dropdown">
                <Link to="/dashboard">
                  <div className="mobile__dropdownItem">My wallet</div>
                </Link>
                <Link to="/dashboard/myaccount">
                  <div className="mobile__dropdownItem">My Account</div>
                </Link>
                <Link to="/dashboard/orders">
                  <div className="mobile__dropdownItem">Orders</div>
                </Link>
                <Link to="/dashboard/delivery_address">
                  <div className="mobile__dropdownItem">Delivery Address</div>
                </Link>
                <Link to="/dashboard/saved-items">
                  <div className="mobile__dropdownItem">Saved Item</div>
                </Link>
                <Link to="/dashboard/reviews">
                  <div className="mobile__dropdownItem">Reviews</div>
                </Link>
                <Link to="/dashboard/recently-viewed">
                  <div className="mobile__dropdownItem">Recently viewed</div>
                </Link>
              </div>
            )}
          </div>
          <div className="mobile__navItem">
            <div
              className="mobile__navLead"
              onClick={() => setAccountToggle(!accountToggle)}
            >
              <span>Categories</span>
            </div>
            <div className="mobile__dropdown">
              <div className="mobile__dropdownItem">
                <img src={laptop} alt="" />
                <span>Laptop & Compter</span>
              </div>
              <div className="mobile__dropdownItem">
                <img src={phone} alt="" />
                <span>Smart phones & Tablets</span>
              </div>
              <div className="mobile__dropdownItem">
                <img src={speaker} alt="" />
                <span>Speakers</span>
              </div>
              <div className="mobile__dropdownItem">
                <img src={other} alt="" />
                <span>Gears</span>
              </div>
              <div className="mobile__dropdownItem">
                <img src={laptop} alt="" />
                <span>Accessories</span>
              </div>
              <div className="mobile__dropdownItem">
                <img src={flash} alt="" />
                <span>Flash Drives</span>
              </div>
              <div className="mobile__dropdownItem">
                <img src={game} alt="" />
                <span>Game & Accessories</span>
              </div>
              <div className="mobile__dropdownItem">
                <img src={phone} alt="" />
                <span>Phone Accessories</span>
              </div>
              <div className="mobile__dropdownItem">
                <img src={other} alt="" />
                <span>Other Categories</span>
              </div>
            </div>
          </div>
          <div className="mobile__navItem">
            <div
              className="mobile__navLead"
              onClick={() => setHelpToggle(!helpToggle)}
            >
              <span>Help</span>
              <span className="chevron-down-outline">
                {helpToggle ? (
                  <ion-icon
                    name="chevron-up-outline"
                    onClick={() => setHelpToggle(!helpToggle)}
                  ></ion-icon>
                ) : (
                  <ion-icon
                    name="chevron-down-outline"
                    onClick={() => setHelpToggle(!helpToggle)}
                  ></ion-icon>
                )}
              </span>
            </div>
            {helpToggle && (
              <div className="mobile__dropdown mb-3">
                <Link to="/faq">
                  <div className="mobile__dropdownItem">FAQ</div>
                </Link>
                <Link to="/about-us">
                  <div className="mobile__dropdownItem">About us</div>
                </Link>
                <Link to="/contact-us">
                  <div className="mobile__dropdownItem">Contact us</div>
                </Link>
                <Link to="/refund-policy">
                  <div className="mobile__dropdownItem">Refund policy</div>
                </Link>
                <Link to="/terms-condition">
                  <div className="mobile__dropdownItem">
                    Terms and condition
                  </div>
                </Link>
                <Link to="/privacy-policy">
                  <div className="mobile__dropdownItem">Privacy policy</div>
                </Link>
              </div>
            )}
          </div>
          <div className="mobile__navItem mb-3">
            <button
              onClick={logOut}
              className={`btn btn-block mt-3 ${
                user ? "btn-lightgrey" : "btn-primary"
              }`}
            >
              {user ? (
                <span className="text-danger">Log out</span>
              ) : (
                <span className="text-white">
                  <Link to="/login">Login</Link>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
