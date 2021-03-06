import React, { useState, useEffect } from "react";
import { compressDays, isOpen, isWeekend } from "utils/helpers";

import styles from "./header.module.scss";
import {
  client,
  GET_WEEKDAY_BUSINESS_HOURS,
  GET_WEEKEND_BUSINESS_HOURS,
} from "server/actions/Contentful";

import { useQuery } from "@apollo/client";
const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [bhOpen, setBHOpen] = useState(false);
  const query = isWeekend()
    ? GET_WEEKEND_BUSINESS_HOURS
    : GET_WEEKDAY_BUSINESS_HOURS;
  const otherQuery = isWeekend()
    ? GET_WEEKDAY_BUSINESS_HOURS
    : GET_WEEKEND_BUSINESS_HOURS; // Get the remaining query

  const {
    loading: isOpenLoading,
    data: isOpenData,
    error: isOpenError,
  } = useQuery(query, {
    client: client,
    pollInterval: 3600000,
  });
  const {
    loading: otherLoading,
    data: otherData,
    error: otherError,
  } = useQuery(otherQuery, {
    client: client,
    pollInterval: 3600000, //Poll every hour
  });

  useEffect(() => {
    if (isOpenData) {
      if (isOpen(isOpenData.businessHoursCollection.items[0])) {
        setStoreOpen(true);
      } else {
        setStoreOpen(false);
      }
    }
    const interval = setInterval(() => {
      if (isOpenData) {
        if (isOpen(isOpenData.businessHoursCollection.items[0])) {
          setStoreOpen(true);
        } else {
          setStoreOpen(false);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isOpenData]);

  return (
    <header className={styles.headerParent}>
      <div className={styles.upperHeader}>
        <div className={styles.upperHeaderLeft}>
          {isOpenData && !isOpenError && !isOpenLoading && (
            <div className={styles.hours}>
              <div data-is-open={storeOpen}></div>
              <span
                onClick={() =>
                  window.innerWidth < 1100
                    ? setBHOpen(!bhOpen)
                    : setBHOpen(!bhOpen)
                }
              >
                {storeOpen ? "We are open!" : "Currently closed."}
              </span>
              <div
                className={`${styles.businessHoursSub} ${
                  bhOpen ? styles.businessHoursSubActive : ""
                }`}
              >
                <div className={styles.navButtonSubTriangle}></div>
                {otherData && !otherLoading && !otherError && (
                  <p>
                    {compressDays(
                      otherData.businessHoursCollection.items[0].daysOpen
                    )}
                    {otherData.businessHoursCollection.items[0].hours.join(
                      ", "
                    )}
                  </p>
                )}
                <p>
                  {compressDays(
                    isOpenData.businessHoursCollection.items[0].daysOpen
                  )}
                  {isOpenData.businessHoursCollection.items[0].hours.join(", ")}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.upperHeaderRight}>
          <a href="/">Find Us</a>
          <a href="tel:=18655941494">(865) 594-1494</a>
          <a href="cart">Cart (0)</a>
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
              <div className={styles.navBtn}>
                <a href="visit" className={styles.navBtnMain}>
                  Visit
                </a>
                <div className={styles.navBtnSub}>
                  <div className={styles.navButtonSubTriangle}></div>
                  <a href="plan">Plan Your Visit</a>
                  <a href="family-night">Family Free Night</a>
                  <a href="exhibits">Exhibits</a>
                </div>
              </div>
              <div className={styles.navBtn}>
                <a href="experience" className={styles.navBtnMain}>
                  Experience
                </a>
                <div className={styles.navBtnSub}>
                  <div className={styles.navButtonSubTriangle}></div>
                  <a href="at-home">Muse at Home</a>
                  <a href="learning-pods">Learning Pods</a>
                  <a href="party-rental">Party or Rental</a>
                  <a href="field-trip">Field Trip</a>
                  <a href="camps">Camps</a>
                  <a href="calendar">Calendar</a>
                  <a href="special-events">Special Events</a>
                  <a href="vip">VIP Experience</a>
                </div>
              </div>
              <div className={styles.navBtn}>
                <a href="educators" className={styles.navBtnMain}>
                  Educators
                </a>
                <div className={styles.navBtnSub}>
                  <div className={styles.navButtonSubTriangle}></div>
                  <a href="field-trips">Field Trips</a>
                  <a href="outreach-events">Outreach Events</a>
                  <a href="preschool">Preschool</a>
                  <a href="home-school">Home School</a>
                </div>
              </div>
              <div className={styles.navBtn}>
                <a href="educators" className={styles.navBtnMain}>
                  About Us
                </a>
                <div className={styles.navBtnSub}>
                  <div className={styles.navButtonSubTriangle}></div>
                  <a href="team">Our Team</a>
                </div>
              </div>
              <div className={styles.navBtn}>
                <a href="join" className={styles.navBtnMain}>
                  Join+Support
                </a>
                <div className={styles.navBtnSub}>
                  <div className={styles.navButtonSubTriangle}></div>
                  <a href="join">Join</a>
                  <a href="donate">Donate</a>
                  <a href="volunteer">Volunteer</a>
                </div>
              </div>
              <div className={styles.navBtn}>
                <a href="shop" className={styles.navBtnMain}>
                  Shop
                </a>
                <div className={styles.navBtnSub}>
                  <div className={styles.navButtonSubTriangle}></div>
                  <a href="shop">Online Store</a>
                  <a href="cart">Cart</a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.navCta}>
            <div>
              <div className={styles.navCtaBtnWrapper}>
                <a href="memberships">Memberships</a>
                <a href="tickets">Tickets</a>
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
  );
};

export default Header;
