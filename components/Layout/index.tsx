import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./layout.module.scss";
interface Options {
  hero?: boolean;
  heroSize?: string;
  heroText?: string;
  wrapperDisabled?: boolean;
}
interface Props {
  options?: Options;
}

const Layout: React.FC<Props> = ({ options, children }) => {
  return (
    <main className={styles["main"]}>
      <Header />
      {options?.hero && options?.heroSize == "sm" && (
        <div className={`${styles["hero"]} ${styles["hero-sm"]}`}>
          <h1>{options?.heroText}</h1>
        </div>
      )}
      {options?.hero && options?.heroSize == "md" && (
        <div className={`${styles["hero"]} ${styles["hero-md"]}`}>
          <h1>{options?.heroText}</h1>
        </div>
      )}
      {options?.hero && options?.heroSize == "lg" && (
        <div className={`${styles["hero"]} ${styles["hero-lg"]}`}>
          <h1>{options?.heroText}</h1>
        </div>
      )}
      {options?.wrapperDisabled && <section>{children}</section>}
      {!options?.wrapperDisabled && (
        <section className={styles["wrapper"]}>{children}</section>
      )}
      <Footer />
    </main>
  );
};
export default Layout;
