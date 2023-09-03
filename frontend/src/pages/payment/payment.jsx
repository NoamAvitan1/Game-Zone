import React, { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./payment.css";
import useUser from "../../hooks/useUser";

export default function Payment() {
    const {user , updateXp} = useUser();
  const price = [
    { price: "99.99$", amount: "500", class: "five-pointed-star" },
    { price: "259.99$", amount: "1500", class: "five-pointed-star" },
    { price: "599.99$", amount: "2500", class: "five-pointed-star" },
  ];
  const [value, setValue] = useState(null);

  const choosePrice = (price) => {
    setValue(price.substring(0, price.length - 1));
  };

  return (
    <div className="Payment">
      <div className="buying-section">
        <h1>Payment</h1>
        <div className="star">
          <div className="five-pointed-star"></div>
          <div className="five-pointed-star"></div>
          <div className="five-pointed-star"></div>
        </div>
        <div className="price">
          {price.map((val, i) => (
            <div
              onClick={() => choosePrice(val.price)}
              key={i}
              className="array"
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    fontSize: "0.5em",
                    marginTop: "6px",
                    marginLeft: "-11px",
                  }}
                  className={`${val.class}`}
                ></div>
                <p style={{ fontSize: "20px" }}>{val.amount}</p>
              </div>
              <p style={{ fontSize: "20px" }}>{val.price}</p>
            </div>
          ))}
        </div>
        {value && (
          <div className="paypal-container">
            <PayPalScriptProvider
              options={{
                clientId:
                  "AUkhkcIh9-ZJbm4lBWqVg5zPvd3k4TMIEggVnY9KX6hZY0l5uwB2LHuPsqgU8k92m4BX_-NHBQv3klhx",
              }}
            >
              <PayPalButtons className="paypal-buttons" style={{layout:"vertical"}}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: value,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data,actions) => {
                    return actions.order.capture().then(function(details){
                        updateXp(parseInt(value));
                        alert(
                            "Payment completed by " + user.name
                        )
                    })
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}
      </div>
    </div>
  );
}
