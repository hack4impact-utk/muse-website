import { NextPage } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import ShopCategories from "components/ShopCategories";
import ShopItems from "components/ShopItems";
import { FaShoppingCart } from "react-icons/fa";
import { getItemsByCategory } from "server/actions/Square/Catalog";
import { Item } from "utils/types";

interface Props {
  items: Item[];
}
const Shop: NextPage<Props> = ({ items }) => {
  return (
    <main>
      <Header />

      <div className="banner">
        <h1>Shop</h1>
      </div>

      <div className="cartContainer">
        <button>
          <FaShoppingCart />
          <span>cart (0)</span>
        </button>
      </div>

      <div className="shopContainer">
        {items && items.length > 0 && console.log(items)}
        <ShopCategories />
        <ShopItems items={items} />
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

export async function getStaticProps(): Promise<{
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
    revalidate: 3600,
  };
}

export async function getStaticPaths(): Promise<{
  paths: { params: { id: string } }[];
  fallback: boolean;
}> {
  const items = await getItemsByCategory([
    "Apparel",
    "Amusement Kits",
    "Learning Kits",
    "Toys",
  ]);
  const paths = items.map(item => ({
    params: { id: item.id },
  }));

  return { paths, fallback: true };
}
