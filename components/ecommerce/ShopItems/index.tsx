import React from "react";
import styles from "./shopitems.module.scss";
import ItemCard from "../ItemCard";
import { Item } from "utils/types";
interface Props {
  items: Item[];
}
const ShopItems: React.FC<Props> = ({ items }) => {
  //Items & categories are dynamically displayed based on what is added in Square
  const categories = items && items.map(item => item.category);

  return (
    <div className={styles.items}>
        {categories &&
            categories.map(category => {
              return (
              <div className={styles.category}>
                <h1 className={styles.header}>{category}</h1>
                {items && items.filter(item => item.category === category).map(item => {
                  return <ItemCard key={item.id} item={item}/>
                })}
              </div>
              )
            })}
    </div>
  );
};

export default ShopItems;
