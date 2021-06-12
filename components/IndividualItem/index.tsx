import React from "react";
import styles from "./individualItem.module.scss";
import { Item } from "utils/types";
interface Props {
  item: Item;
}
const IndividualItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img
          src={item.imageUrl ? item.imageUrl : "/item.png"}
          alt={item.name}
        ></img>
      </div>

      <div className={styles.body}>
        <div className={styles.title}>
          <h1>{item.name}</h1>
        </div>
        <div className={styles.content}>
          <h2>${item.variations[0].price}</h2>
          <div className={styles.quantity}>
            QTY
            <input type="number"></input>
          </div>
          <div className={styles.description}>{item.description}</div>
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default IndividualItem;
