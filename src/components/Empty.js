import ecommercesale from "../assets/imgs/ecommercesale.svg";
import noNetwork from "../assets/imgs/icons/no-network.svg";

const Empty = ({
  emptyTitle,
  emptySubTitle,
  buttonText,
  link,
  network = false,
}) => {
  return (
    <div className="empty">
      {!network && (
        <img className="empty__img" src={ecommercesale} alt="empty page" />
      )}
      {network && <img className="" src={noNetwork} alt="network error" />}
      <div className="empty__content">
        <p className={`${network ? "red__text" : ""} empty__text`}>
          {emptyTitle}
        </p>
        <span className="empty__subText">{emptySubTitle}</span>
      </div>
      {buttonText && (
        <a href={link} className="btn btn-primary empty__link">
          {buttonText}
        </a>
      )}
      {network && (
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary empty__link"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Empty;
