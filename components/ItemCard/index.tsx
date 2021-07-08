import React from "react";
import styles from "./itemcard.module.scss";
import { Item } from "utils/types";
interface Props {
  item: Item;
}
const ItemCard: React.FC<Props> = ({ item }) => {
  return (
    <a href={`/shop/${item.id}`} className={styles.item}>
      <div className={styles.image}>
        <img
          src={item.imageUrl ? item.imageUrl : "/item.png"}
          alt={item.name}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.priceChip}>${item.variations[0].price}</div>
        <h1>{item.name}</h1>
        <a href={`/shop/${item.id}`}>View</a>
      </div>
    </a>
  );
};

export default ItemCard;
