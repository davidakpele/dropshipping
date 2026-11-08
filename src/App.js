import "./App.css";
import "./App1.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import MyWallet from "./pages/MyWallet";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import DeliveryAddress from "./pages/DeliveryAddress";
import Checkout from "./pages/Checkout";
import ShippingAddress from "./components/ShippingAddress";
import Reviews from "./pages/Reviews";
import SavedItems from "./pages/SavedItems";
import RateProducts from "./components/RateProducts";
import RateOrder from "./components/RateOrder";
import MyAccount from "./pages/MyAccount";
import RecentlyViewed from "./pages/RecentlyViewed";
import Notification from "./pages/Notification";
import ThankYou from "./pages/ThankYou";
import Loader from "./pages/Loader";
import EditAccount from "./pages/EditAccount";
import RankingBadge from "./pages/RankingBadge";
import Error from "./pages/Error";
import Faq from "./pages/Faq";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import RefundPolicy from "./pages/RefundPolicy";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnToError from "./pages/ReturnToError";

const App = () => {
  const user = useSelector((state) => state.auth.userDetails);
  const cart = useSelector((state) => state.cart.carts);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/login"
          element={<Login />}
          // element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route
          exact
          path="/dashboard/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route index="true" element={<MyWallet />} />
          <Route path="orders" element={<Order />} />
          <Route path="orders/orderdetails" element={<OrderDetails />} />
          <Route path="orders/rate-products" element={<RateProducts />} />
          <Route path="orders/rate-order" element={<RateOrder />} />
          <Route path="delivery_address" element={<DeliveryAddress />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="saved-items" element={<SavedItems />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="recently-viewed" element={<RecentlyViewed />} />
          <Route path="notification" element={<Notification />} />
          <Route path="edit-account" element={<EditAccount />} />
          <Route path="ranking-badge" element={<RankingBadge />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            user && cart && cart.length ? (
              <Checkout />
            ) : user && cart && !cart.length ? (
              <Navigate to="/cart" />
            ) : (
              !user && <Navigate to="/login" />
            )
          }
        />
        <Route path="/shipping-address" element={<ShippingAddress />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-incomplete" element={<ReturnToError />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="*" element={<Error />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
