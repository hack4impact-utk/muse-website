import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./layout.module.scss";
interface Options {
  hero?: boolean;
  heroSize?: string;
  heroText?: string;
}
interface Props {
  options?: Options;
}

const Layout: React.FC<Props> = ({ options, children }) => {
  return (
    <main>
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
      {children}
      <Footer />
    </main>
  );
};
export default Layout;
