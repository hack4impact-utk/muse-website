import React from "react";
import styles from "./shopitems.module.scss";
import ItemCard from "../ItemCard";
import { Item } from "utils/types";
interface Props {
  items: Item[];
}
const ShopItems: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.items}>
      <div className={styles.category}>
        <h1 className={styles.header}>Apparel</h1>
        {items &&
          items
            .filter(item => item.category === "Apparel")
            .map(item => {
              return <ItemCard key={item.id} item={item} />;
            })}
      </div>
      <div className={styles.category}>
        <h1 className={styles.header}>Amusement Kits</h1>
        {items &&
          items
            .filter(item => item.category === "Amusement Kits")
            .map(item => {
              return <ItemCard key={item.id} item={item} />;
            })}
      </div>
      <div className={styles.category}>
        <h1 className={styles.header}>Learning Kits</h1>
        {items &&
          items
            .filter(item => item.category === "Learning Kits")
            .map(item => {
              return <ItemCard key={item.id} item={item} />;
            })}
      </div>
      <div className={styles.category}>
        <h1 className={styles.header}>Toys</h1>
        {items &&
          items
            .filter(item => item.category === "Toys")
            .map(item => {
              return <ItemCard key={item.id} item={item} />;
            })}
      </div>
    </div>
  );
};

export default ShopItems;
