import { NextPage } from "next";
import Head from "next/head";
import Header from "components/shared/Header";
import Footer from "components/shared/Footer";
import ShopItems from "components/ecommerce/ShopItems";
import { FaShoppingCart } from "react-icons/fa";
import { getItemsByCategory } from "server/actions/Square/Catalog";
import { Item, CartItem } from "utils/types";
import useSWR from "swr";
import urls from "utils/urls";

interface Props {
  items: Item[];
}
const Shop: NextPage<Props> = ({ items }) => {
  const fetcher = (url: string): Promise<unknown> =>
    fetch(url).then(r => r.json());
  const { data, error } = useSWR(
    `${urls.baseUrl}${urls.api.cart}`,
    fetcher
  ) as {
    data: { success: boolean; payload: CartItem[] };
    error: string;
  };
  return (
    <main>
      <Head>
        <title>Shop | Muse Knoxville</title>
      </Head>
      <Header />

      <div className="banner">
        <h1>Shop</h1>
      </div>

      <div className="cartContainer">
        <button>
          <FaShoppingCart />
          <span>
            Cart (
            {data &&
              !error &&
              (data as { success: boolean; payload: Item[] }).payload.reduce(
                (numItems, item) => {
                  return numItems + item.quantity;
                },
                0
              )}
            )
          </span>
        </button>
      </div>

      <div className="shopContainer">
      { items && 
        <ShopItems items={items} />
      }
      </div>

      <Footer />

      <style jsx global>{`
        h1 {
          margin: 0;
        }
      `}</style>
      <style jsx>{`
        div.banner {
          width: auto;
          height: auto;
          background-color: #f99e26;
        }
        div.banner h1 {
          padding: 60px 0;
          text-align: center;
          color: #ffffff;
        }
        @media only screen and (max-width: 1100px) {
          div.banner h1 {
            padding: 30px 0;
          }
        }

        // Container for Cart Button.
        div.cartContainer {
          width: 100%;
          margin: 20px 0 10px 0;
          text-align: right;
        }
        div.cartContainer button {
          font-size: 2.5em;
          margin-right: 30px;
          background-color: transparent;
          border: none;
        }
        div.cartContainer button:hover {
          cursor: pointer;
        }
        div.cartContainer button span {
          font-size: 0.5em;
          padding: 10px 0 0 12.5px;
          display: inline-block;
          vertical-align: top;
        }
        div.cartContainer button:hover span {
          text-decoration: underline;
        }
        @media only screen and (max-width: 1100px) {
          div.cartContainer button {
            font-size: 2em;
          }
        }

        // Container for Categories and Items
        div.shopContainer {
          max-width: 1050px;
          height: auto;
          margin: 0 auto 30px auto;
          display: grid;
          grid-template-columns: 25% 75%;
        }
        @media only screen and (max-width: 1100px) {
          div.shopContainer {
            display: block;
          }
        }
      `}</style>
    </main>
  );
};

export default Shop;

//! This may have to be changed later.
export async function getServerSideProps(): Promise<{
  props: { items: Item[] };
  revalidate?: number | boolean;
}> {
  const items = await getItemsByCategory([
    "Apparel",
    "Amusement Kits",
    "Learning Kits",
    "Toys",
  ]);

  return {
    props: {
      items: items,
    },
  };
}

