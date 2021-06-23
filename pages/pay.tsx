import Layout from "components/Layout";
import Head from "next/head";
import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const AtHome: React.FC = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              // charge users $499 per order
              value: 1101.1,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then(orderID => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // handles when a payment is confirmed for paypal
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setBillingDetails(payer);
      setSucceeded(true);
    });
  };
  // handles payment errors
  const onError = (data, actions) => {
    setPaypalErrorMessage("Something went wrong with your payment");
  };

  return (
    <div>
      <PayPalButtons
        style={{
          color: "blue",
          shape: "pill",
          label: "pay",
          tagline: false,
          layout: "horizontal",
        }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
      <div>
        {succeeded && "the payment was successful"}
        {orderID}
      </div>
    </div>
  );
};

export default AtHome;
