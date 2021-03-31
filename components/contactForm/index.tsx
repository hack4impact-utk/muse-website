import React from "react";
import styles from "./contactForm.module.scss";

const ContactForm: React.FC = () => {
  return (
    <form className={styles.container}>
      <label>
        Name
        <input></input>
      </label>

      <label>
        Email
        <input></input>
      </label>

      <label>
        Phone
        <input></input>
      </label>

      <label>
        Subject
        <input></input>
      </label>

      <label>
        Message
        <input></input>
      </label>
    </form>
  );
};

export default ContactForm;
