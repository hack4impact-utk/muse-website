import React from "react";
import styles from "./suggestedItems.module.scss";

const SuggestedItems: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Similar Items</h1>
      <div className={styles.wrap}>
      </div>
    </div>
  );
};

export default SuggestedItems;
