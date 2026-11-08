// component imports

import OrderedItem from "./OrderedItem";

const orderedItems = [
  {
      orderId:  "SNG123456789",
      qty: 3,
      price: "750,000",
      trackingNo: "123456789",
      status: "processing",
      date: "19-06-23",
      coupon: "3GTY6"
  },
  {
      orderId:  "SNG123456780",
      qty: 3,
      price: "750,000",
      trackingNo: "123456789",
      status: "pending",
      date: "19-06-23",
      coupon: "3GTY6"
  },
  {
      orderId:  "SNG123456786",
      qty: 3,
      price: "750,000",
      trackingNo: "123456789",
      status: "shipped",
      date: "19-06-23",
      coupon: "3GTY6"
  },
  {
      orderId:  "SNG123456783",
      qty: 3,
      price: "750,000",
      trackingNo: "123456789",
      status: "delivered",
      date: "19-06-23",
      coupon: "3GTY6"
  }
  ,
  {
      orderId:  "SNG123456783",
      qty: 3,
      price: "750,000",
      trackingNo: "123456789",
      status: "cancelled",
      date: "19-06-23",
      coupon: "3GTY6"
  },
  {
    orderId:  "SNG123456789",
    qty: 3,
    price: "750,000",
    trackingNo: "123456789",
    status: "processing",
    date: "19-06-23",
    coupon: "3GTY6"
},
{
    orderId:  "SNG123456780",
    qty: 3,
    price: "750,000",
    trackingNo: "123456789",
    status: "pending",
    date: "19-06-23",
    coupon: "3GTY6"
},
{
    orderId:  "SNG123456786",
    qty: 3,
    price: "750,000",
    trackingNo: "123456789",
    status: "shipped",
    date: "19-06-23",
    coupon: "3GTY6"
},
{
    orderId:  "SNG123456783",
    qty: 3,
    price: "750,000",
    trackingNo: "123456789",
    status: "delivered",
    date: "19-06-23",
    coupon: "3GTY6"
}
,
{
    orderId:  "SNG123456783",
    qty: 3,
    price: "750,000",
    trackingNo: "123456789",
    status: "cancelled",
    date: "19-06-23",
    coupon: "3GTY6"
}
,
{
    orderId:  "SNG123456783",
    qty: 3,
    price: "750,000",
    trackingNo: "123456789",
    status: "cancelled",
    date: "19-06-23",
    coupon: "3GTY6"
}
,
{
    orderId:  "SNG123456783",
    qty: 3,
    price: "750,000",
    trackingNo: "123456789",
    status: "cancelled",
    date: "19-06-23",
    coupon: "3GTY6"
}

]

const OrderedItems = () => {
  return (
    <div className="items__list">
      {orderedItems.map((orders) => (
        <OrderedItem orders={orders} />
      ))}
    </div>
  );
};

export default OrderedItems;
