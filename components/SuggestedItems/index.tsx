import React from "react";
import styles from "./suggestedItems.module.scss";

const SuggestedItems: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Similar Items</h1>
      <div className={styles.wrap}>
        <div className={styles.items}>
          <div>
            <div className={styles.images}>
              <img src={"/item.png"} alt="Suggested item 2"></img>
            </div>
            <div className={styles.item}>
              Full Day Pass <br></br>
              $30.00 <br></br>
              Add to Cart
            </div>
          </div>
        </div>
        <div className={styles.items}>
          <div>
            <div className={styles.images}>
              <img src={"/item.png"} alt="Suggested item 2"></img>
            </div>
            <div className={styles.item}>
              Full Day Pass <br></br>
              $30.00 <br></br>
              Add to Cart
            </div>
          </div>
        </div>
        <div className={styles.items}>
          <div>
            <div className={styles.images}>
              <img src={"/item.png"} alt="Suggested item 2"></img>
            </div>
            <div className={styles.item}>
              Full Day Pass <br></br>
              $30.00 <br></br>
              Add to Cart
            </div>
          </div>
        </div>
        <div className={styles.items}>
          <div>
            <div className={styles.images}>
              <img src={"/item.png"} alt="Suggested item 2"></img>
            </div>
            <div className={styles.item}>
              Full Day Pass <br></br>
              $30.00 <br></br>
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedItems;
