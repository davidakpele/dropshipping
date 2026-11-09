import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import shopnigLogo from "../assets/new-imgs/shopnig-logo.png";
import shopnigLogoDark from "../assets/new-imgs/Shopnig-logodark.svg";
import { axiosInstance, currency_formatter } from "../libries";
import Notifications from "../pages/Notifications";
import { logout } from "../store/slices/authSlice";
import WithAuth from "../WithAuth";
// import { clearCarts } from "../store/slices/cartSlice";

const fallbackCategories = [
  { id: 1, name: "Laptop & Computer" },
  { id: 2, name: "Smart phones & Tablets" },
  { id: 3, name: "Speakers" },
  { id: 4, name: "Gears" },
  { id: 5, name: "Accessories" },
  { id: 6, name: "Flash Drives" },
  { id: 7, name: "Game & Accessories" },
  { id: 8, name: "Phone Accessories" },
  { id: 9, name: "Other categories" },
];

const getSubcategories = (category) => {
  const subcategories = [
    category.subcategories,
    category.subCategories,
    category.sub_categories,
    category.subcategory,
    category.sub_category,
    category.childCategories,
    category.child_categories,
    category.children,
  ].find(Array.isArray);

  return subcategories || [];
};

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userDetails);
  const { carts } = useSelector((state) => state.cart);
  const [toggle, setToggle] = useState(false);
  // const [notice, setNotification] = useState(false);
  const [categories, setCategories] = useState(fallbackCategories);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [accountToggle, setAccountToggle] = useState(false);
  const [helpToggle, setHelpToggle] = useState(false);
  const [search_suggestions, setSearchSuggestions] = useState(null);
  const [suggest, setSuggest] = useState([]);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [searchParams] = useSearchParams();

  // getting the popular categories here to display on the navbar
  const { popularCategories } = useSelector((state) => state.cache);

  const [select_val, setSelectValue] = useState({
    name: "All categories",
    id: "",
  });
  const uiMode = useSelector((state) => state.app.uiMode);

  const [showNotifications, setShowNotifications] = useState(false);

  let total = 0;
  carts.forEach((itm) => {
    if (!itm.variation_info?.length) total += 1;
    else total += itm.variation_info.length;
  });

  useEffect(() => {
    axiosInstance()
      .get(`/categories`)
      .then((resp) => {
        const fetchedCategories = resp.data.data.category;
        if (Array.isArray(fetchedCategories) && fetchedCategories.length) {
          setCategories(fetchedCategories);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    axiosInstance()
      .get("/products/all/category/null?key=all")
      .then((resp) => setSearchSuggestions(resp.data.data.products.data))
      .catch(console.error);
  }, []);

  const logOut = () => {
    dispatch(
      logout({
        accessToken: null,
        userDetails: null,
      }),
    );

    localStorage.removeItem("app_state");
    window.location.reload();
  };

  const getSuggestions = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);

    if (query.length > 1) {
      let filterSuggestions = search_suggestions?.filter(
        (el) => el.name.toLowerCase().indexOf(query) > -1,
      );

      filterSuggestions = filterSuggestions?.map(({ id, name, category }) => ({
        id,
        name,
        category: category.name,
      }));

      setSuggest(filterSuggestions);
      setSuggestionsActive(true);
    } else setSuggestionsActive(false);
  };

  const select_dropdown = (e, id) => {
    setSelectValue({ name: e.target.innerText, id: id });
    document.querySelector(".categories__option").classList.remove("active");
  };

  // resetting brand and filter option when a popular category is selected from the navbar
  const handlePopularCategorySel = () => {
    searchParams.delete("filter");
    console.log("here...");
  };

  return (
    <>
      {showNotifications ? (
        <Notifications closeHandler={() => setShowNotifications(false)} />
      ) : null}
      <div className="header-container">
        <header className={`header ${toggle ? "header--sidebar-open" : ""}`}>
          <div className="container header__container">
            <button
              className="header__sidebar-toggle"
              onClick={() => setToggle((t) => !t)}
            >
              <ion-icon name="menu-outline"></ion-icon>
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <Link to="/">
              <img
                src={uiMode === "light" ? shopnigLogo : shopnigLogoDark}
                alt=""
                className="header__logo"
              />
            </Link>
            <form
              className="header__search"
              action="/categories"
              method="get"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/categories?prod=${value}`);
              }}
            >
              <div className="header__search-main">
                <ion-icon
                  name="search-outline"
                  className="header__search-icon"
                ></ion-icon>
                <input
                  type="text"
                  name="prod"
                  // value={value.trim().split("-").join(" ")}
                  value={value}
                  placeholder="Search for products"
                  className="header__search-input"
                  autoComplete="off"
                  onChange={(event) => {
                    getSuggestions(event);
                    setValue(event.target.value);
                  }}
                />
                {/* <div className="header__search-divider"></div>
                <div className="header__search-category">
                  <div className="categories" id="categories">
                    <input
                      type="hidden"
                      name="categories"
                      value={select_val.id}
                    />
                    <input
                      type="text"
                      value={select_val.name}
                      onChange={(e) => e.target.value}
                      onClick={(e) => {
                        document
                          .querySelector(".categories__option")
                          .classList.toggle("active");
                      }}
                    />
                    <div className="categories__option">
                      {categories?.map((itm, id) => (
                        <div
                          key={id}
                          className="categories__option-item"
                          onClick={(e) => select_dropdown(e, itm.id)}
                        >
                          {itm.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </div> */}
                <div
                  className={`suggestions ${
                    suggestionsActive ? null : "hidden"
                  }`}
                >
                  <ul>
                    {suggest?.map(({ id, name }, idx) => (
                      <li
                        key={idx}
                        onClick={(e) => {
                          setValue(e.target.innerText);

                          document
                            .querySelector(".header__search-main .suggestions")
                            .classList.add("hidden");

                          navigate(`/product-details/${id}`);
                        }}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button type="submit" className="header__search-btn">
                Search
              </button>
            </form>
            <div className="header__icon-links">
              <Link to="/dashboard" className="header__icon-link">
                <ion-icon name="person-outline"></ion-icon>
              </Link>
              <Link to="/cart" className="header__icon-link">
                <ion-icon name="cart-outline"></ion-icon>
                {total ? <sup>{total}</sup> : ""}
              </Link>
              {user ? (
                <Link
                  to="#"
                  className="header__icon-link"
                  onClick={() => setShowNotifications(true)}
                >
                  <ion-icon name="notifications-outline"></ion-icon>
                  {user.unread_notification_count ? (
                    <sup>{user.unread_notification_count}</sup>
                  ) : null}
                </Link>
              ) : null}
            </div>
            <ul className="header__navbar">
              <li className="header__navbar-item header__navbar-item--has-sub">
                <Link to="#" className="header__navbar-link">
                  <ion-icon name="person-outline"></ion-icon>
                  <span>{user ? `Hi, ${user.first_name}` : "My Account"}</span>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </Link>
                <div className="header__navbar-sub">
                  <div className="header__navbar-sub-menu">
                    <Link to="/dashboard" className="header__navbar-sub-link">
                      My Wallet
                    </Link>
                    <Link
                      to="/dashboard/my-account"
                      className="header__navbar-sub-link"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/dashboard/orders"
                      className="header__navbar-sub-link"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/dashboard/delivery_address"
                      className="header__navbar-sub-link"
                    >
                      Delivery Address
                    </Link>
                    <Link
                      to="/dashboard/saved-items"
                      className="header__navbar-sub-link"
                    >
                      Saved Items
                    </Link>
                    <Link
                      to="/dashboard/reviews"
                      className="header__navbar-sub-link"
                    >
                      Reviews
                    </Link>
                    <Link
                      to="/dashboard/recently-viewed"
                      className="header__navbar-sub-link"
                    >
                      Recently viewed
                    </Link>
                    <div className="header__navbar-sub-divider"></div>
                    <div className="header__navbar-sub-btn-block">
                      <button
                        className={!user ? "active" : ""}
                        onClick={() => {
                          if (!user) navigate("/login");
                          if (user) logOut();
                        }}
                      >
                        {user ? "Log Out" : "Log In"}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li className="header__navbar-item header__navbar-item--has-sub">
                <Link to="#" className="header__navbar-link">
                  <ion-icon name="help-circle-outline"></ion-icon>
                  <span>Help</span>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </Link>
                <div className="header__navbar-sub">
                  <div className="header__navbar-sub-menu">
                    <Link to="/faq" className="header__navbar-sub-link">
                      FAQ
                    </Link>
                    <Link to="/about-us" className="header__navbar-sub-link">
                      About Us
                    </Link>
                    <Link to="/contact-us" className="header__navbar-sub-link">
                      Contact Us
                    </Link>
                    <Link
                      to="/refund-policy"
                      className="header__navbar-sub-link"
                    >
                      Refund Policy
                    </Link>
                    <Link
                      to="/terms-condition"
                      className="header__navbar-sub-link"
                    >
                      Terms & Conditions
                    </Link>
                    <Link
                      to="/privacy-policy"
                      className="header__navbar-sub-link"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </li>
              <li className="header__navbar-item">
                <Link to="/cart" className="header__navbar-link">
                  <ion-icon name="cart-outline"></ion-icon>
                  <span>Cart</span>
                  <sup style={!total ? { visibility: "hidden" } : {}}>
                    {total}
                  </sup>
                </Link>
              </li>
            </ul>
            <div className="header__right">
              {!user ? (
                <>
                  <Link to="/login" className="header__navbar-link">
                    <ion-icon name="log-in-outline"></ion-icon>
                    <span>Login</span>
                  </Link>
                  <div className="header__right-divider"></div>
                  <Link to="/sign-up" className="header__navbar-link">
                    <ion-icon name="log-out-outline"></ion-icon>
                    <span>Register</span>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" className="header__navbar-link">
                  <ion-icon name="wallet-outline"></ion-icon>
                  <span>
                    {currency_formatter(user.wallet.available_balance ?? 0)}
                  </span>
                </Link>
              )}
            </div>
          </div>
          <aside className="sidebar1 header__sidebar">
            <div className="sidebar1__main">
              <div className="sidebar1__block">
                <div className="sidebar1__flex">
                  {!user ? (
                    <>
                      <Link to="/login" className="header__navbar-link">
                        <ion-icon name="log-in-outline"></ion-icon>
                        <span>Login</span>
                      </Link>
                      <div className="header__right-divider"></div>
                      <Link to="/sign-up" className="header__navbar-link">
                        <ion-icon name="log-out-outline"></ion-icon>
                        <span>Register</span>
                      </Link>
                    </>
                  ) : (
                    <Link to="/dashboard" className="header__navbar-link">
                      <ion-icon name="wallet-outline"></ion-icon>
                      <span>
                        {currency_formatter(user.wallet.available_balance ?? 0)}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
              <div className="sidebar1__block">
                <div
                  className="sidebar1__menu-header mb-0"
                  onClick={() => setAccountToggle((at) => !at)}
                >
                  <p>{user ? `Hi, ${user.first_name}` : "My Account"}</p>
                  <ion-icon
                    name={
                      accountToggle
                        ? "chevron-up-outline"
                        : "chevron-down-outline"
                    }
                  ></ion-icon>
                </div>
                {accountToggle ? (
                  <ul className="sidebar1__menu">
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/dashboard"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        My Wallet
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/dashboard/my-account"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        My Account
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/dashboard/orders"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        Orders
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/dashboard/delivery_address"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        Delivery Address
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/dashboard/saved-items"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        Saved Items
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/dashboard/reviews"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        Reviews
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/dashboard/recently-viewed"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        Recently Viewed
                      </Link>
                    </li>
                  </ul>
                ) : null}
              </div>
              <div className="sidebar1__block">
                <div className="sidebar1__menu-header mb-0">
                  <p>Categories</p>
                </div>
                <ul className="sidebar1__menu">
                  <li className="sidebar1__menu-item">
                    <Link
                      to="/categories?categories=1"
                      className="sidebar1__menu-link"
                      onClick={() => setToggle((t) => !t)}
                    >
                      <ion-icon name="laptop-outline"></ion-icon>
                      Laptop & Computer
                    </Link>
                  </li>
                  <li className="sidebar1__menu-item">
                    <Link
                      to="/categories?categories=2"
                      className="sidebar1__menu-link"
                      onClick={() => setToggle((t) => !t)}
                    >
                      <ion-icon name="phone-portrait-outline"></ion-icon>
                      Smart phones & Tablets
                    </Link>
                  </li>
                  <li className="sidebar1__menu-item">
                    <Link
                      to="/categories?categories=3"
                      className="sidebar1__menu-link"
                      onClick={() => setToggle((t) => !t)}
                    >
                      <ion-icon name="megaphone-outline"></ion-icon>
                      Speakers
                    </Link>
                  </li>
                  <li className="sidebar1__menu-item">
                    <Link
                      to="/categories?categories=4"
                      className="sidebar1__menu-link"
                      onClick={() => setToggle((t) => !t)}
                    >
                      <ion-icon name="game-controller-outline"></ion-icon>
                      Gears
                    </Link>
                  </li>
                  <li className="sidebar1__menu-item">
                    <Link
                      to="/categories?categories=5"
                      className="sidebar1__menu-link"
                      onClick={() => setToggle((t) => !t)}
                    >
                      <ion-icon name="disc-outline"></ion-icon>
                      Accessories
                    </Link>
                  </li>
                  <li className="sidebar1__menu-item">
                    <Link
                      to="/categories?categories=6"
                      className="sidebar1__menu-link"
                      onClick={() => setToggle((t) => !t)}
                    >
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      Flash Drives
                    </Link>
                  </li>
                  <li className="sidebar1__menu-item">
                    <Link
                      to="/categories?categories=7"
                      className="sidebar1__menu-link"
                      onClick={() => setToggle((t) => !t)}
                    >
                      <ion-icon name="game-controller-outline"></ion-icon>
                      Game & Accessories
                    </Link>
                  </li>
                  <li className="sidebar1__menu-item">
                    <Link
                      to="/categories?categories=8"
                      className="sidebar1__menu-link"
                      onClick={() => setToggle((t) => !t)}
                    >
                      <ion-icon name="call-outline"></ion-icon>
                      Phone Accessories
                    </Link>
                  </li>
                  <li className="sidebar1__menu-item">
                    <Link
                      to="/categories?categories=9"
                      className="sidebar1__menu-link"
                      onClick={() => setToggle((t) => !t)}
                    >
                      <ion-icon name="keypad-outline"></ion-icon>
                      Other categories
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="sidebar1__block">
                <div
                  className="sidebar1__menu-header mb-0"
                  onClick={() => setHelpToggle((ht) => !ht)}
                >
                  <p>Help</p>
                  <ion-icon
                    name={
                      helpToggle ? "chevron-up-outline" : "chevron-down-outline"
                    }
                  ></ion-icon>
                </div>
                {helpToggle ? (
                  <ul className="sidebar1__menu">
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/faq"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        FAQ
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/about-us"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        About Us
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/contact-us"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/refund-policy"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        Refund Policy
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/terms-condition"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li className="sidebar1__menu-item">
                      <Link
                        to="/privacy-policy"
                        className="sidebar1__menu-link"
                        onClick={() => setToggle((t) => !t)}
                      >
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                ) : null}
              </div>
              <div className="sidebar1__block">
                <div className="header__navbar-sub-btn-block">
                  <button
                    className={!user ? "active" : ""}
                    onClick={() => {
                      if (!user) navigate("/login");
                      if (user) logOut();
                      setToggle((t) => !t);
                    }}
                  >
                    {user ? "Log Out" : "Log In"}
                  </button>
                </div>
              </div>
            </div>
          </aside>
          <div className="sidebar-overlay"></div>
        </header>
        <section className="top-bar">
          <div className="container top-bar__container">
            <div className="top-bar__categories">
              <div className="top-bar__categories-block">
                <ion-icon name="menu-outline"></ion-icon>
                All Categories
              </div>
              <div className="top-bar__menu">
                <div className="top-bar__menu-header"></div>
                <div className="top-bar__menu-main">
                  <div className="top-bar__menu-left">
                    <ul className="top-bar__menu1">
                      {categories?.map((itm) => {
                        const subcategories = getSubcategories(itm);

                        return (
                          <li
                            className="top-bar__menu1-item"
                            key={itm.id}
                            onMouseEnter={() => setActiveCategoryId(itm.id)}
                            onMouseLeave={() => setActiveCategoryId(null)}
                            onFocus={() => setActiveCategoryId(itm.id)}
                            onBlur={(event) => {
                              if (
                                !event.currentTarget.contains(
                                  event.relatedTarget,
                                )
                              ) {
                                setActiveCategoryId(null);
                              }
                            }}
                          >
                            <Link to="#" className="top-bar__menu1-link">
                              <ion-icon name="laptop-outline"></ion-icon>
                              {/* <img src={itm.image_url} alt={itm.name} /> */}
                              {itm.name}
                            </Link>
                            <div
                              className={`top-bar__menu-right ${
                                activeCategoryId === itm.id
                                  ? "top-bar__menu-right--active"
                                  : ""
                              }`}
                            >
                              <div>
                                <h3 className="top-bar__menu-heading">
                                  Sub-categories
                                </h3>
                                <div className="top-bar__menu-subcategories">
                                  {subcategories.length ? (
                                    subcategories.map((subcategory, index) => (
                                      <Link
                                        to={`/categories?categories=${subcategory.id ?? itm.id}`}
                                        className="top-bar__menu2-link"
                                        key={subcategory.id ?? index}
                                      >
                                        {subcategory.name ?? subcategory}
                                      </Link>
                                    ))
                                  ) : (
                                    <Link
                                      to={`/categories?categories=${itm.id}`}
                                      className="top-bar__menu2-link"
                                    >
                                      View all {itm.name}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <ul className="top-bar__navbar top-bar__navbar-main">
              {popularCategories?.map((cat) => (
                <li
                  className="top-bar__navbar-item"
                  key={cat.id}
                  onClick={handlePopularCategorySel}
                >
                  <Link
                    to={`/categories?categories=${cat.category_id}`}
                    className="top-bar__navbar-link"
                  >
                    <ion-icon name="laptop-outline"></ion-icon>
                    {cat.name}
                  </Link>
                </li>
              ))}
              {/* <li className="top-bar__navbar-item">
                <Link
                  to="/categories?categories=1"
                  className="top-bar__navbar-link"
                >
                  <ion-icon name="laptop-outline"></ion-icon>
                  Laptop & Computer
                </Link>
              </li>
              <li className="top-bar__navbar-item">
                <Link
                  to="/categories?categories=2"
                  className="top-bar__navbar-link"
                >
                  <ion-icon name="phone-portrait-outline"></ion-icon>
                  Smartphones & Tablets
                </Link>
              </li>
              <li className="top-bar__navbar-item">
                <Link
                  to="/categories?categories=3"
                  className="top-bar__navbar-link"
                >
                  <ion-icon name="megaphone-outline"></ion-icon>
                  Speakers
                </Link>
              </li>
              <li className="top-bar__navbar-item">
                <Link
                  to="/categories?categories=4"
                  className="top-bar__navbar-link"
                >
                  <ion-icon name="game-controller-outline"></ion-icon>
                  Gears
                </Link>
              </li>
              <li className="top-bar__navbar-item">
                <Link
                  to="/categories?categories=8"
                  className="top-bar__navbar-link"
                >
                  <ion-icon name="phone-portrait-outline"></ion-icon>
                  Phone Accessories MERCY
                </Link>
              </li> */}
            </ul>
            {user ? (
              <ul className="top-bar__navbar">
                <li className="top-bar__navbar-item">
                  <Link
                    to="#"
                    className="top-bar__navbar-link"
                    onClick={() => setShowNotifications(true)}
                  >
                    <ion-icon name="notifications-outline"></ion-icon>
                    {user.unread_notification_count ? (
                      <sup>{user.unread_notification_count}</sup>
                    ) : null}
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
};

export default WithAuth(Navbar);
