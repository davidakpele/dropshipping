// components import
// import DashboardLayout from "./DashboardLayout/DashboardLayout";

// images import
import shoppingcart from "../assets/imgs/Shopping cart.png";

const EmptyOrder = () => {
  return (
    <div className="empty__order">
      <div className="order__placed">
        <img src={shoppingcart} alt="empty cart" />
        <p className="no__order">You have not placed any order yet!</p>
        <span>
          Once you placed an order, all orders placed will appear here!!!
        </span>
        <button className="start__shopping">Start Shopping</button>
      </div>
    </div>
  );
};

export default EmptyOrder;
