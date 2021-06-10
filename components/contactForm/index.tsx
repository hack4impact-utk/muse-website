import React from "react";
import styles from "./contactForm.module.scss";
interface IFormValues {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  subject?: string;
  message?: string;
  [key: string]: string | null | undefined;
}
const ContactForm: React.FC = () => {
  const [values, setValues] = React.useState({} as IFormValues);
  const handleChange = (e: React.SyntheticEvent) => {
    e.persist();
    const target = e.target as HTMLInputElement;
    setValues(values => ({ ...values, [target.name]: target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    //TODO:  Add state for loading component to display
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (response.status === 200) {
      //TODO: add state for success message component to display
      alert("Message successfully sent.");
    }
  };
  return (
    <div className={styles.container}>
      <form name="contactForm" className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={values.userName || ""}
          onChange={handleChange}
          name="userName"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="email@gmail.com"
          value={values.email || ""}
          onChange={handleChange}
          name="email"
          required
        />

        <label htmlFor="phoneNumber">Phone</label>
        <input
          type="tel"
          placeholder="888-555-7777"
          name="phoneNumber"
          value={values.phoneNumber || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          placeholder="Questions or Compliments!"
          name="subject"
          value={values.subject || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          value={values.message || ""}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
