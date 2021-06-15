import Layout from "components/Layout";
import { Item, ItemVariation, CartAPIResponse } from "utils/types";
import useSWR from "swr";
import CartItem from "components/Cart/CartItem";
const CartPage: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then(r => r.json());
  const { data, error } = useSWR<CartAPIResponse, string>("/api/cart", fetcher);
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
        <a href="/" className="checkoutBtn">
          Proceed to checkout
        </a>
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
