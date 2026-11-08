// components
import Layout from "../containers/Layout";
import SimilarProduct from "../components/SimilarProduct";
import LimitedOffer from "../components/LimitedOffer";
import gadgets from "../assets/imgs/banners/gadgets.png";
import Breadcrumb from "../components/Breadcrumb";
import AvailableCart from "../components/AvailableCart";
import EmptyCart from "../components/EmptyCart";
import { useSelector } from "react-redux";

const Cart = () => {
  const { carts } = useSelector((state) => state.cart);

  return (
    <Layout>
      <Breadcrumb name="Product detail >" />
      <div className="container">
        {carts?.length ? <AvailableCart data={carts} /> : <EmptyCart />}
        <SimilarProduct title="Gadgets you may also like" />
        <LimitedOffer src={gadgets} />
      </div>
    </Layout>
  );
};

export default Cart;
