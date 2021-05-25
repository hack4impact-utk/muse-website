import React from "react";
import styles from "./calendar.module.scss";

const Calendar: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dateRange}>
        <div className={styles.dates}>
          <label htmlFor="week">Select a week: </label>
          <input type="week" id="week"></input>
        </div>
      </div>
      <h1>April 5th, 2021</h1>
      <div className={styles.event}>
        <div className={styles.right}>
          <h4>Seats Available: 10</h4>
          <button className={styles.button}>Add to Cart</button>
        </div>
        <div className={styles.left}>
          <h2>Event Name</h2>
          <h3>12:00 PM - 4:00 PM</h3>
        </div>
      </div>
      <h1>April 6th, 2021</h1>
      <div className={styles.event}>
        <div className={styles.right}>
          <h4>Seats Available: 10</h4>
          <button className={styles.button}>Add to Cart</button>
        </div>
        <div className={styles.left}>
          <h2>Event Name</h2>
          <h3>12:00 PM - 4:00 PM</h3>
        </div>
      </div>
      <h1>April 7th, 2021</h1>
      <div className={styles.event}>
        <div className={styles.right}>
          <h4>Seats Available: 10</h4>
          <button className={styles.button}>Add to Cart</button>
        </div>
        <div className={styles.left}>
          <h2>Event Name</h2>
          <h3>12:00 PM - 4:00 PM</h3>
        </div>
      </div>
      <h1>April 8th, 2021</h1>
      <div className={styles.event}>
        <div className={styles.right}>
          <h4>Seats Available: 10</h4>
          <button className={styles.button}>Add to Cart</button>
        </div>
        <div className={styles.left}>
          <h2>Event Name</h2>
          <h3>12:00 PM - 4:00 PM</h3>
        </div>
      </div>
      <h1>April 9th, 2021</h1>
      <div className={styles.event}>
        <div className={styles.right}>
          <h4>Seats Available: 10</h4>
          <button className={styles.button}>Add to Cart</button>
        </div>
        <div className={styles.left}>
          <h2>Event Name</h2>
          <h3>12:00 PM - 4:00 PM</h3>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
