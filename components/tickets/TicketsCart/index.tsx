import React from "react";
import styles from "./ticketscart.module.scss";

const TicketsCart: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Cart</h1>
      <div className={styles.item}>
        <input type="number" min="0" max="99"></input>
        <h2>Child Ticket $7.90</h2>
      </div>
      <div className={styles.total}>
        <h1>Total $37.95</h1>
      </div>
      <button className={styles.button}>Checkout</button>
    </div>
  );
};

export default TicketsCart;
