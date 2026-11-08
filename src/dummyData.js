import payment from "./assets/imgs/icons/payment.svg";
import dateoforder from "./assets/imgs/icons/dateoforder.svg";
import orderNumber from "./assets/imgs/icons/orderNumber.svg";
import delivery from "./assets/imgs/icons/delivery.svg";
import canon from "./assets/imgs/canon.svg";

export const allOrderedItems = [
  {
    itemImg: canon,
    itemName: "Canon EOS R6",
    itemPriceTag: "320,000.00",
    itemQuantity: 1,
  },
  {
    itemImg: canon,
    itemName: "Canon EOS R6",
    itemPriceTag: "320,000.00",
    itemQuantity: 1,
  },
  {
    itemImg: canon,
    itemName: "Canon EOS R6",
    itemPriceTag: "320,000.00",
    itemQuantity: 1,
  },
  {
    itemImg: canon,
    itemName: "Canon EOS R6",
    itemPriceTag: "320,000.00",
    itemQuantity: 1,
  },
];
export const allAddress = [
  {
    id: 1,
    user_id: "",
    is_default: 0,
    first_name: "Mary",
    last_name: "Dan-Micah",
    phone_number: "+2348012345678",
    address: "2, Wiseki Drive Albarka Complex Extension Bodija, Ibadan",
    lg_id: "",
    state_id: "",
    country_id: 1,
  },
  {
    id: 2,
    user_id: "",
    is_default: 0,
    first_name: "Mary",
    last_name: "Dan-Micah",
    phone_number: "+2348012345678",
    address: "2, Wiseki Drive Albarka Complex Extension Bodija, Ibadan",
    lg_id: "",
    state_id: "",
    country_id: 1,
  },
  {
    id: 3,
    user_id: "",
    is_default: 0,
    first_name: "Mary",
    last_name: "Dan-Micah",
    phone_number: "+2348012345678",
    address: "2, Wiseki Drive Albarka Complex Extension Bodija, Ibadan",
    lg_id: "",
    state_id: "",
    country_id: 1,
  },
  {
    id: 4,
    user_id: "",
    is_default: 0,
    first_name: "Mary",
    last_name: "Dan-Micah",
    phone_number: "+2348012345678",
    address: "2, Wiseki Drive Albarka Complex Extension Bodija, Ibadan",
    lg_id: "",
    state_id: "",
    country_id: 1,
  },
];

export const orderInfo = [
  {
    color: "orange",
    iconOfOrder: orderNumber,
    orderTrack: "Order Number",
    orderValue: "CSX567HJGT123",
  },
  {
    color: "grey",
    iconOfOrder: delivery,
    orderTrack: "Delivery method",
    orderValue: "Door step delivery",
  },
  {
    color: "green",
    iconOfOrder: dateoforder,
    orderTrack: "Order Date",
    orderValue: "Monday, July 20, 2023",
  },
  {
    color: "blue",
    iconOfOrder: payment,
    orderTrack: "Payment method",
    orderValue: "ShopNig Wallet",
  },
];
