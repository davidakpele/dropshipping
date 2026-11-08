import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

import axios from "axios";
import cls from "classnames";

import { baseUrl } from "../libries";
import { getDateTime, getTime } from "../utils/func";

import VerticalBarLoader from "./VerticalBarLoader";

const Notifications = ({ closeHandler }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [url, setUrl] = useState(`${baseUrl}/accounts/get-notifications`);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [dateNotifications, setDateNotifications] = useState({});
  const [links, setLinks] = useState([]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.data.status) throw new Error("");

        const nots = res.data.data.notifications.data;

        const formattedTransactions = {};

        nots.forEach((notification) => {
          const totalDate = getTime(notification.created_at);
          const [date, time] = getDateTime(notification.created_at);

          notification.date = date;
          notification.time = time;

          formattedTransactions[totalDate] =
            formattedTransactions[totalDate] || [];
          formattedTransactions[totalDate].push(notification);
        });

        setDateNotifications(formattedTransactions);
        setLinks(res.data.data.notifications.links);

        // Set notifications read in background
        // return api_client({
        //   method: "POST",
        //   url: "/read-notifications",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        //   data: JSON.stringify({
        //     last_id: nots[0].id,
        //   }),
        // });

        return new Promise((resolve, reject) => {
          resolve("done");
        });
      })
      .then(() => {
        // do nothing
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [accessToken, url, dispatch]);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <div
        className={cls(
          "notifications-block",
          show && "notifications-block--show"
        )}
      >
        <div className="notifications-block__header">
          <ion-icon name="notifications"></ion-icon>
          Notifications
          <span
            className="notifications-block__close"
            onClick={() => {
              setUrl();
              closeHandler();
            }}
          >
            <ion-icon name="close"></ion-icon>
          </span>
        </div>
        <div className="notifications-block__main">
          {error ? (
            <div className="notifications-block__info">
              Error fetching notifications
            </div>
          ) : null}
          {loading ? <VerticalBarLoader sm /> : null}
          {!loading && !error && !Object.keys(dateNotifications).length ? (
            <div className="notifications-block__info">
              You have no new notifications
            </div>
          ) : null}
          {!loading && !error && Object.keys(dateNotifications).length
            ? Object.entries(dateNotifications).map(([date, notifications]) => (
                <div className="notifications-block__block" key={date}>
                  <div className="notifications-block__block-header">
                    <p className="notifications-block__block-heading">{date}</p>
                    <div className="notifications-block__divider"></div>
                  </div>
                  <div className="notificiations-block__notifications">
                    {notifications.map((notification) => (
                      <div className="notification1" key={notification.id}>
                        <button className="notification1__btn"></button>
                        <p className="notification1__text">
                          {notification.content}
                        </p>
                        <div className="notification1__dates">
                          <p>{notification.time}</p>
                          <p>{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : null}
        </div>
        {!loading && !error && Object.keys(dateNotifications).length ? (
          <div className="notifications-block__footer">
            <div className="pagination1">
              {links.map((link, i) => {
                return isNaN(+link.label) || link.active ? (
                  <button
                    className={link.active ? "active" : ""}
                    onClick={() => setUrl(link.url || "")}
                    key={link.label}
                  >
                    {i === 0 ? (
                      <>&#8249;</>
                    ) : i === links.length - 1 ? (
                      <>&#8250;</>
                    ) : (
                      link.label
                    )}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Notifications;
