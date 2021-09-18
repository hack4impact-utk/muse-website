import React from "react";
import styles from "./signin.module.scss";

const SignIn: React.FC = () => {
  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.loginWrapper}>
          <div className={styles.logo}>
            <a href="/">
              <img src="/logo.png" alt="Muse Knoxville Logo" />
            </a>
          </div>

          <form>
            <div className={styles.textFields}>
              <label>
                <body>Email</body>
                <input type="text" className={styles.login} />
              </label>
            </div>
            <div className={styles.textFields}>
              <label>
                <body>Password</body>
                <input type="password" className={styles.login} />
              </label>
            </div>
            <div className={styles.lButton}>
              <button type="submit" className={styles.login}>
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
