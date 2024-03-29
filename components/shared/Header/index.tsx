import React, { useState } from "react";
import styles from "./header.module.scss";
import { CartItem, Item } from "utils/types";
import useSWR from "swr";
import urls from "utils/urls";
import StoreOpenStatus from "components/shared/Header/StoreOpenStatus";
import DropdownLinks from "components/shared/Header/DropdownLinks";
const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  //storeOpen, closingSoon, and storeStatus could probably all be refactored into one state.

  const fetcher = (url: string): Promise<unknown> =>
    fetch(url).then(r => r.json());
  const { data, error } = useSWR(
    `${urls.baseUrl}${urls.api.cart}`,
    fetcher
  ) as {
    data: { success: boolean; payload: CartItem[] };
    error: string;
  };
  return (
    <div>
      <header className={styles.headerParent}>
        <div className={styles.upperHeader}>
          <div className={styles.upperHeaderLeft}>
            <StoreOpenStatus />
          </div>
          <div className={styles.upperHeaderRight}>
            <a href="/">Find Us</a>
            <a href="tel:=18655941494">(865) 594-1494</a>
            <a href="/cart">
              <span>
                Cart(
                  {data &&
                  !error &&
                    (data as {
                    success: boolean;
                    payload: Item[];
                    }).payload.reduce((numItems, item) => {
                    return numItems + item.quantity;
                  }, 0)}
                )
              </span>
            </a>
          </div>
        </div>
        <div className={styles.mainHeader}>
          <button
            className={
              mobileOpen
                ? styles.mobileHeaderOverlayOpen
                : styles.mobileHeaderOverlay
            }
            onClick={() => setMobileOpen(!mobileOpen)}
            onKeyDown={() => setMobileOpen(!mobileOpen)}
          ></button>
          <div className={styles.headerLogo}>
            <a href="/">
              <img src="/logo.png" alt="Muse Knoxville Logo" />
            </a>
          </div>
          <div className={mobileOpen ? styles.headerNavOpen : styles.headerNav}>
            <div className={styles.navMain}>
              <div className={styles.navMainBtnWrapper}>
                <DropdownLinks />
              </div>
            </div>
            <div className={styles.navCta}>
              <div>
                <div className={styles.navCtaBtnWrapper}>
                  <a href="/memberships">Memberships</a>
                  <a href="https://www-1577g.bookeo.com/bookeo/b_playmuseknox_start.html?ctlsrc2=BLfxvSB%2B12ItO84SvJC5DHm%2B3gzJKkEmOIn6GcDrAyQ%3D&src=02i">Tickets</a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.hamburgerButtonParent}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={
                mobileOpen ? styles.hamburgerButtonOpen : styles.hamburgerButton
              }
            >
              <div
                className={
                  mobileOpen ? styles.hamburgerLineOpen : styles.hamburgerLine
                }
              ></div>
              <div
                className={
                  mobileOpen ? styles.hamburgerLineOpen : styles.hamburgerLine
                }
              ></div>
              <div
                className={
                  mobileOpen ? styles.hamburgerLineOpen : styles.hamburgerLine
                }
              ></div>
            </button>
          </div>
        </div>
      </header>
      <div className={styles.headerContentSpacer}></div>
    </div>
  );
};

export default Header;
