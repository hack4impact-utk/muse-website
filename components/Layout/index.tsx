import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./layout.module.scss";
import InitialView from "components/Home/InitialView";
interface Options {
  hero?: boolean;
  heroSize?: string;
  heroText?: string;
  wrapperDisabled: boolean;
  initialView: boolean;
}
interface Props {
  options?: Options;
}

const Layout: React.FC<Props> = ({ options, children }) => {
  return (
    <main className={styles["main"]}>
      <Header />
      {/* If the hero is needed and it needs to be small */}
      {options && options?.hero && options?.heroSize == "sm" && (
        <div className={`${styles["hero"]} ${styles["hero-sm"]}`}>
          <h1>{options?.heroText}</h1>
        </div>
      )}
      {/* If the hero is needed and it needs to be medium */}
      {options && options?.hero && options?.heroSize == "md" && (
        <div className={`${styles["hero"]} ${styles["hero-md"]}`}>
          <h1>{options?.heroText}</h1>
        </div>
      )}
      {/* If the hero is needed and it needs to be large */}
      {options && options?.hero && options?.heroSize == "lg" && (
        <div className={`${styles["hero"]} ${styles["hero-lg"]}`}>
          <h1>{options?.heroText}</h1>
        </div>
      )}
      {/* If the initial view is not needed and the wrapper isn't needed as well */}
      {options && !options?.initialView && options?.wrapperDisabled && (
        <section>{children}</section>
      )}

      {/* If the initial view is not needed but the wrapper is */}
      {options && !options.initialView && !options?.wrapperDisabled && (
        <section className={styles["wrapper"]}>{children}</section>
      )}
      {/* If the initial view is needed and the wrapper is needed as well. */}
      {options && options.initialView && !options.wrapperDisabled && (
        <section className={styles["flex-col"]}>
          <InitialView />
          <div className={styles["wrapper"]}>{children}</div>
        </section>
      )}
      <Footer />
    </main>
  );
};
export default Layout;
