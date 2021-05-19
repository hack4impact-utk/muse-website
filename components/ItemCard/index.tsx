import React from "react";
import styles from "./itemcard.module.scss";

const ItemCard: React.FC = () => {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={"/item.png"} alt="Suggested item 1" />
      </div>
      <div className={styles.info}>
        <h1>Full Day Pass</h1>
        <h2>$30.00</h2>
        <a href="x">Add to Cart</a>
      </div>
    </div>
  );
};

export default ItemCard;