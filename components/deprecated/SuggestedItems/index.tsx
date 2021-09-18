import React from "react";
import styles from "./suggestedItems.module.scss";
import ItemCard from "../../ecommerce/ItemCard";

const SuggestedItems: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Similar Items</h1>
      <div className={styles.wrap}>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
};

export default SuggestedItems;
