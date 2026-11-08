const CartNotification = ({ cartMessage, cartStatus, setShowCartNotify }) => {
  const show = setInterval(() => {
    setShowCartNotify(false);
    clearInterval(show);
  }, 3000);
  return (
    <div className="cartnotify">
      <p
        className={`${
          cartStatus === "success" ? "success__notify " : "error__notify"
        } cartnotify__text`}
      >
        {cartMessage}
      </p>
    </div>
  );
};

export default CartNotification;
