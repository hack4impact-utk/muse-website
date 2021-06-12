import React from "react";
import styles from "./itemcard.module.scss";
import { Item } from "utils/types";
interface Props {
  item: Item;
}
const ItemCard: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img
          src={item.imageUrl ? item.imageUrl : "/item.png"}
          alt={item.name}
        />
      </div>
      <div className={styles.info}>
        <h1>{item.name}</h1>
        <h2>${item.variations[0].price}</h2>
        <a href={`/shop/${item.id}`}>View</a>
      </div>
    </div>
  );
};

export default ItemCard;
