import React from "react";

// import Layout from "../containers/Layout";

const Notification = ({ close }) => {
  return (
    // <Layout>
    <>
      <div className="pop__show"></div>
      <div className="notification">
        <div className="notice__page">
          <div>
            <h5 className="text">Notification</h5>
          </div>
          <div className="close__pop" onClick={close}>
            <ion-icon name="close"></ion-icon>
          </div>
        </div>
        <div className="notice__day">
          <h5 className="today">Today</h5>
          <div className="line"></div>
        </div>
        <div className="notice__details">
          <div className="detailed">
            <div>
              <ion-icon name="ellipse"></ion-icon>
            </div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>

          <div className="detailedd">
            <div></div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>

          <div className="detailed">
            <div>
              <ion-icon name="ellipse"></ion-icon>
            </div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>

          <div className="detailedd">
            <div></div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>

          <div className="detailed">
            <div>
              <ion-icon name="ellipse"></ion-icon>
            </div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>

          <div className="detailedd">
            <div></div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>
        </div>

        <div className="notice__day">
          <h5 className="today">Yesterday</h5>
          <span className="line"></span>
        </div>
        <div className="notice__details">
          <div className="detailed">
            <div>
              <ion-icon name="ellipse"></ion-icon>
            </div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>

          <div className="detailedd">
            <div></div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>

          <div className="detailed">
            <div>
              <ion-icon name="ellipse"></ion-icon>
            </div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>

          <div className="detailedd">
            <div></div>
            <div className="text">
              <p className="textt">
                Your order SNG0123456789 has been
                <span className="bold"> confirmed</span> and is <br /> expected
                to be delivered between 14 and 16 Aug 2023.
              </p>
            </div>
            <div className="time">
              <p className="timee">02:45</p>
              <p className="datee">6 July, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </>
    // </Layout>
  );
};

export default Notification;
