import cls from "classnames";

const Alert = ({ type, dark = false, children, closeHandler }) => {
  return (
    <div
      className={cls("alert-1", `alert-1--${type}`, dark && "alert-1--dark")}
    >
      <div className="alert-1__icon-box">
        <ion-icon
          icon={
            type === "success"
              ? "checkmark-circle"
              : type === "warning"
              ? "alert-circle"
              : "close"
          }
        ></ion-icon>
      </div>
      <div
        className="alert-1__message"
        dangerouslySetInnerHTML={{ __html: children }}
      />
      <div className="alert-1__close-block">
        <span className="alert-1__close" onClick={closeHandler}>
          <ion-icon name="close"></ion-icon>
        </span>
      </div>
    </div>
  );
};

export default Alert;
