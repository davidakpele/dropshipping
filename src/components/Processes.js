import { useEffect, useState } from "react";

const Processes = ({orderSteps}) => {

// "IN TRANSIT might be replaced with SHIPPED"

  const [prev, setPrev] = useState();

  useEffect(() => {
    if (orderSteps === "PENDING") {
      setPrev(0);
    } else if (orderSteps === "PROCESSING") {
      setPrev(1);
    } else if (orderSteps === "IN TRANSIT") {
      setPrev(2);
    } else {
      setPrev(3);
    }
  }, [orderSteps]);

  const steps = ["PENDING", "PROCESSING", "IN TRANSIT", "DELIVERED"];

  return (
    <section className="processes">
      <div className="processes__list">
        {steps?.map((step, index) => (
          <div
            key={index}
            className={`${step === orderSteps ? "active" : ""}
            ${index < prev ? "checked" : ""} ${
              (step === "DELIVERED" && step === orderSteps) ? "remove__margin" : ""
            }
            ${
              (step === "PENDING" &&
              step === orderSteps) ?
              "remove__margin__left" : ""
            } processes__list__item`}
          >
            <p
              className={`${
                step === orderSteps && "show__progress"
              } progress__label`}
            >
              {step}
            </p>
            <div className="progress__count"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Processes;
