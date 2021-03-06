import React from "react";
import useSWR from "swr";
import styles from "../Header/header.module.scss";
import urls from "utils/urls";
const DropdownLinks: React.FC = () => {
  const fetcher = (url: string): Promise<unknown> =>
    fetch(url).then(r => r.json());
  const { data, error } = useSWR(
    `${urls.baseUrl}${urls.api.dropdowns}`,
    fetcher
  );
  return (
    <>
      <div className={styles.navBtn}>
        <a href="visit" className={styles.navBtnMain}>
          Visit
        </a>
        <div className={styles.navBtnSub}>
          <div className={styles.navButtonSubTriangle}></div>
          {data && !error && data.payload.filter(page => page.data.dropdownCategory === "Visit").map(page => {
            return (
              <a key={page.data.title} href={page.data.url}>{page.data.title}</a>
            )
          })}
        </div>
      </div>
      <div className={styles.navBtn}>
        <a href="experience" className={styles.navBtnMain}>
          Experience
        </a>
        <div className={styles.navBtnSub}>
          <div className={styles.navButtonSubTriangle}></div>
          {data && !error && data.payload.filter(page => page.data.dropdownCategory === "Experience").map(page => {
            return (
              <a key={page.data.title} href={page.data.url}>{page.data.title}</a>
            )
          })}
        </div>
      </div>
      <div className={styles.navBtn}>
        <a href="educators" className={styles.navBtnMain}>
          Educators
        </a>
        <div className={styles.navBtnSub}>
          <div className={styles.navButtonSubTriangle}></div>
          {data && !error && data.payload.filter(page => page.data.dropdownCategory === "Educators").map(page => {
            return (
              <a key={page.data.title} href={page.data.url}>{page.data.title}</a>
            )
          })}
        </div>
      </div>
      <div className={styles.navBtn}>
        <a href="educators" className={styles.navBtnMain}>
          About Us
        </a>
        <div className={styles.navBtnSub}>
          <div className={styles.navButtonSubTriangle}></div>
          {data && !error && data.payload.filter(page => page.data.dropdownCategory === "About Us").map(page => {
            return (
              <a key={page.data.title} href={page.data.url}>{page.data.title}</a>
            )
          })}
        </div>
      </div>
      <div className={styles.navBtn}>
        <a href="join" className={styles.navBtnMain}>
          Join+Support
        </a>
        <div className={styles.navBtnSub}>
          <div className={styles.navButtonSubTriangle}></div>
          {data && !error && data.payload.filter(page => page.data.dropdownCategory === "Join+Support").map(page => {
            return (
              <a key={page.data.title} href={page.data.url}>{page.data.title}</a>
            )
          })}
        </div>
      </div>
      <div className={styles.navBtn}>
        <a href="/shop" className={styles.navBtnMain}>
          Shop
        </a>
        <div className={styles.navBtnSub}>
          <div className={styles.navButtonSubTriangle}></div>
          <a href="/shop">Online Store</a>
          <a href="/cart">Cart</a>
        </div>
      </div>
    </>
  );
};
export default DropdownLinks;
