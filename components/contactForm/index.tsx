import React from "react";
import styles from "./contactForm.module.scss";

const ContactForm: React.FC = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label>
          Name
          <input placeholder="John Doe"></input>
        </label>

        <label>
          Email
          <input placeholder="email@gmail.com"></input>
        </label>

        <label>
          Phone
          <input placeholder="888-555-7777"></input>
        </label>

        <label>
          Subject
          <input placeholder="Questions or Compliments!"></input>
        </label>

        <label>
          Message
          <textarea></textarea>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
