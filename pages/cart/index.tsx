import Layout from "components/shared/Layout";
import { Item, CartAPIResponse } from "utils/types";
import useSWR from "swr";
import CartItem from "components/ecommerce/Cart/CartItem";
import React from "react";
import { useRouter } from "next/router";
const CartPage: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then(r => r.json());
  const { data, error } = useSWR<CartAPIResponse, string>("/api/cart", fetcher);
  const router = useRouter();
  const proceedToCheckout = async (e: React.SyntheticEvent) => {
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
      {data && !error && data.payload.length < 1 && <p>Your cart is empty.</p>}
      {data &&
        !error &&
        data.payload.length >= 1 &&
        data.payload.map((item: Item) => {
          return <CartItem item={item} key={item.id} />;
        })}

      {data && !error && data.payload.length >= 1 && (
        <button className="checkoutBtn" onClick={proceedToCheckout}>
          Proceed to checkout
        </button>
      )}
      <style jsx>{`
        .subtotal {
          width: 60%;
          align-self: center;
        }
        .checkoutBtn {
          margin: 20px 0;
          height: 30px;
          padding: 2rem;
          align-self: center;
          background: #9dc13b;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
        }
      `}</style>
    </Layout>
  );
};

export default CartPage;
