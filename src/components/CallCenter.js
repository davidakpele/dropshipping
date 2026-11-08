import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../libries";
import { setLogisticsRep, setOrdersRep } from "../store/slices/cacheSlice";
import Image from "./Image";

import reachBgLight from "../assets/imgs/reach-bg.svg";
import reachBgDark from "../assets/imgs/reach-bg-dark.svg";

const CallCenter = () => {
  const { orders, logistics } = useSelector((state) => state.cache);
  const uiMode = useSelector((state) => state.app.uiMode);

  const dispatch = useDispatch();

  // const [orders, setOrders] = useState(null),
  //   [logistics, setLogistics] = useState(null);

  useEffect(() => {
    axiosInstance()
      .get("/representatives/orders")
      .then((resp) => {
        const ordersRep = resp.data.data.representatives;
        dispatch(setOrdersRep(ordersRep));
        // setOrders(resp.data.data.representatives);
      })
      .catch(console.error);

    axiosInstance()
      .get("/representatives/logistics")
      .then((resp) => {
        const logisticsRep = resp.data.data.representatives;
        dispatch(setLogisticsRep(logisticsRep));
        // setLogistics(resp.data.data.representatives)
      })
      .catch(console.error);
  }, []);

  return (
    <div
      className="reach-section mt-medium"
      style={{
        backgroundImage: `url(${
          uiMode === "light" ? reachBgLight : reachBgDark
        })`,
      }}
    >
      {/* uiMode === "light" ? reachBgLight : reachBgDark */}
      <div className="container-sm reach-section__container">
        <h3 className="reach-section__header">
          Reach <span>ShopNig</span> faster
        </h3>
        <div className="reach-section__section">
          <div className="reach-section__section-block">
            <h3>Orders</h3>
            <div className="reach-section__contacts">
              {!orders
                ? new Array(2).fill(null).map((_, i) => (
                    <div className="reach-section__contact" key={i}>
                      <div className="reach-section__contact-img placeholder"></div>
                      <div className="reach-section__contact-main">
                        <p className="reach-section__contact-name">
                          <span className="placeholder">Jane</span>
                        </p>
                        <p className="reach-section__contact-phone">
                          <span className="placeholder">+234 000 000 000</span>
                        </p>
                      </div>
                    </div>
                  ))
                : orders.map((itm) => (
                    <div className="reach-section__contact" key={itm.id}>
                      <Image
                        src={itm.image_url}
                        alt=""
                        className="reach-section__contact-img"
                      />
                      <div className="reach-section__contact-main">
                        <p className="reach-section__contact-name">
                          {itm.name}
                        </p>
                        <p className="reach-section__contact-phone">
                          {itm.phone_number}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="reach-section__section-block">
            <h3>Disputes</h3>
            <div className="reach-section__contacts">
              {!logistics
                ? new Array(2).fill(null).map((_, i) => (
                    <div className="reach-section__contact" key={i}>
                      <div className="reach-section__contact-img placeholder"></div>
                      <div className="reach-section__contact-main">
                        <p className="reach-section__contact-name">
                          <span className="placeholder">Jane</span>
                        </p>
                        <p className="reach-section__contact-phone">
                          <span className="placeholder">+234 000 000 000</span>
                        </p>
                      </div>
                    </div>
                  ))
                : logistics.map((itm) => (
                    <div className="reach-section__contact" key={itm.id}>
                      <Image
                        src={itm.image_url}
                        alt=""
                        className="reach-section__contact-img"
                      />
                      <div className="reach-section__contact-main">
                        <p className="reach-section__contact-name">
                          {itm.name}
                        </p>
                        <p className="reach-section__contact-phone">
                          {itm.phone_number}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="reach-section__section-block">
            <h3>Logistics</h3>
            <div className="reach-section__contacts">
              {!logistics
                ? new Array(2).fill(null).map((_, i) => (
                    <div className="reach-section__contact" key={i}>
                      <div className="reach-section__contact-img placeholder"></div>
                      <div className="reach-section__contact-main">
                        <p className="reach-section__contact-name">
                          <span className="placeholder">Jane</span>
                        </p>
                        <p className="reach-section__contact-phone">
                          <span className="placeholder">+234 000 000 000</span>
                        </p>
                      </div>
                    </div>
                  ))
                : logistics.map((itm) => (
                    <div className="reach-section__contact" key={itm.id}>
                      <Image
                        src={itm.image_url}
                        alt=""
                        className="reach-section__contact-img"
                      />
                      <div className="reach-section__contact-main">
                        <p className="reach-section__contact-name">
                          {itm.name}
                        </p>
                        <p className="reach-section__contact-phone">
                          {itm.phone_number}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="reach-section__section-block">
            <h3>HQ</h3>
            <div className="reach-section__contacts">
              <p>
                AB 15 Albarika complex (Arisekola Market) Bodija, Ibadan,
                Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallCenter;
