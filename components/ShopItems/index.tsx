import React from "react";
import styles from "./shopitems.module.scss";
import ItemCard from "../ItemCard";

const ShopItems: React.FC = () => {
  return (
    <div className={styles.items}>
      <div className={styles.category}>
        <h1 className={styles.header}>Tickets</h1>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
      <div className={styles.category}>
        <h1 className={styles.header}>Learning Kits</h1>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
};

export default ShopItems;
