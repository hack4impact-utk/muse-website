import React from "react";
import styles from "./individualItem.module.scss";

const IndividualItem: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Full Day Pass for Muse Knoxville Week 9-12</h1>
      </div>

      <div className={styles.image}>
        <img src={"/item.png"} alt="Core value 1"></img>
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.description}>
            Description of item in detail if it is needed here. At the moment it
            is filler text but this is the place customers can see what comes
            included with the tickets or learning kits they are purchasing.
          </div>
          <button className={styles.button}>Add to Cart</button>
          <h1>$30.00</h1>
          <div className={styles.quantity}>
            QTY
            <input type="text"></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualItem;
