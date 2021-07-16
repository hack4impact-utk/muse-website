import Layout from "components/Layout";
import Head from "next/head";
import { Item, CartAPIResponse } from "utils/types";
import useSWR from "swr";
import CartItem from "components/Cart/CartItem";
import CartLoader from "components/Cart/CartLoader";
import Spinner from "components/Loading/Spinner";
import React, { useState } from "react";
import { useRouter } from "next/router";

const CartPage: React.FC = () => {
  const [loading, setLoading] = useState(false); //Controls the spinner next to the checkout button
  const fetcher = (url: string) => fetch(url).then(r => r.json());
  const { data, error } = useSWR<CartAPIResponse, string>("/api/cart", fetcher);
  const router = useRouter();
  const proceedToCheckout = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch("/api/orders", { method: "PUT" });
    const d = (await response.json()) as { success: boolean; payload: string };
    if (d.success) {
      void router.push(d.payload);
    }
  };
  return (
    <Layout
      options={{
        hero: true,
        heroSize: "sm",
        heroText: "My Cart",
        initialView: false,
        wrapperDisabled: false,
      }}
    >
      <Head>
        <title>My Cart | Muse Knoxville</title>
      </Head>
      {!data && !error && <CartLoader />}
      {data && !error && (
        <h3 className="subtotal">
          Subtotal: $
          {data.payload
            .reduce((currentTotal, item) => {
              return (
                currentTotal +
                parseFloat(item.variations[0].price) * item.quantity
              );
            }, 0)
            .toFixed(2)}
        </h3>
      )}
      {data && !error && data.payload.length < 1 && (
        <>
          <p className="cartEmptyText">Your cart is empty.</p>
          <a href="/shop" className="button">
            Visit Store
          </a>
        </>
      )}
      {data &&
        !error &&
        data.payload.length >= 1 &&
        data.payload.map((item: Item) => {
          return <CartItem item={item} key={item.id} />;
        })}

      <div className="checkoutParent">
        {data && !error && data.payload.length >= 1 && (
          <button className="checkoutBtn" onClick={proceedToCheckout}>
            Proceed to checkout
          </button>
        )}
        {loading ? (
          <div className="checkoutSpinner">
            <Spinner />
          </div>
        ) : (
          <></>
        )}
      </div>
      <style jsx>{`
        .subtotal {
          width: 60%;
          align-self: center;
        }
        .checkoutParent {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .checkoutBtn {
          display: inline-block;
          margin: 20px 0;
          height: 30px;
          padding: 2rem;
          align-self: center;
          background: #9dc13b;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
          border: none;
        }
        .checkoutBtn:hover {
          cursor: pointer;
        }
        .checkoutSpinner {
          position: relative;
          display: inline-block;
          padding: 0px 30px;
        }
        .cartEmptyText {
          font-size: 34px;
          margin: auto;
          margin-bottom: 40px;
        }
        .button {
          border: none;
          margin: 20px 0px;
          text-align: center;
          font-size: 24px;
          font-family: "Quicksand", "sans-serif";
          color: white;
          width: 250px;
          padding: 10px 20px;
          align-self: center;
          background-color: #9cc03c;
          cursor: pointer;
          margin-bottom: 100px;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  );
};

export default CartPage;
