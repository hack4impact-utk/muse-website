import Layout from "components/Layout";
import Head from "next/head";
import Calendar from "components/Calendar/index";
import CartComponent from "components/CartComponent/index";
import React from "react";
const Cart: React.FC = () => {
  const options = {
    hero: true,
    heroSize: "md",
    heroText: "Reserve Your Play",
    wrapperDisabled: true,
    initialView: false,
  };
  return (
    <Layout options={options}>
      <Head>
        <title>Cart | Muse Knoxville</title>
      </Head>
      <Calendar />
      <CartComponent />
    </Layout>
  );
};

export default Cart;
