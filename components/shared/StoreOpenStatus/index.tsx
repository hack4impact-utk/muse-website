import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  client,
  GET_WEEKDAY_BUSINESS_HOURS,
  GET_WEEKEND_BUSINESS_HOURS,
} from "server/actions/Contentful";
import { BusinessHoursResponse } from "utils/types";
import {
  closeToClosing,
  compressDays,
  isOpen,
  isWeekend,
} from "utils/helpers/hours";
import styles from "../Header/header.module.scss";
const StoreOpenStatus: React.FC = () => {
  const [storeOpen, setStoreOpen] = useState(false);
  const [closingSoon, setClosingSoon] = useState(false);
  const [storeStatus, setStoreStatus] = useState("");
  const [bhOpen, setBHOpen] = useState(false); //Displays business hours dropdown on click.
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
  } = useQuery<BusinessHoursResponse>(query, {
    client: client,
    pollInterval: 3600000,
  });
  //Gets weekend if first query is weekday, and vice versa.
  const {
    loading: otherLoading,
    data: otherData,
    error: otherError,
  } = useQuery<BusinessHoursResponse>(otherQuery, {
    client: client,
    pollInterval: 3600000, //Poll every hour
  });

  useEffect(() => {
    if (isOpenData) {
      //Check to see if the store is open.
      if (isOpen(isOpenData.businessHoursCollection.items[0])) {
        setStoreOpen(true);
        if (closeToClosing(isOpenData.businessHoursCollection.items[0].hours)) {
          setClosingSoon(true);
        }
      } else {
        setStoreOpen(false);
      }
      if (storeOpen && closingSoon) {
        setStoreStatus("Closing soon.");
      } else if (storeOpen && !closingSoon) {
        setStoreStatus("We are open!");
      } else {
        setStoreStatus("We are closed.");
      }
    }
    const interval = setInterval(() => {
      if (isOpenData) {
        if (isOpen(isOpenData.businessHoursCollection.items[0])) {
          setStoreOpen(true);
          if (
            closeToClosing(isOpenData.businessHoursCollection.items[0].hours)
          ) {
            setClosingSoon(true);
          }
        } else {
          setStoreOpen(false);
        }

        if (storeOpen && closingSoon) {
          setStoreStatus("Closing soon.");
        } else if (storeOpen && !closingSoon) {
          setStoreStatus("We are open!");
        } else {
          setStoreStatus("We are closed.");
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isOpenData, storeOpen, closingSoon]);

  return (
    <>
      {isOpenData && !isOpenError && !isOpenLoading && (
        <div className={styles.hours}>
          <div data-is-open={storeOpen} data-closing-soon={closingSoon}></div>
          <span
            role="button"
            tabIndex={0}
            onClick={() =>
              window.innerWidth < 1100 ? setBHOpen(!bhOpen) : setBHOpen(!bhOpen)
            }
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key == "enter") {
                setBHOpen(!bhOpen);
              }
            }}
          >
            {storeStatus}
          </span>
          <div
            className={`${styles.businessHoursSub} ${
              bhOpen ? styles.businessHoursSubActive : ""
            }`}
          >
            <div className={styles.hoursTriangle}></div>
            {otherData && !otherLoading && !otherError && (
              <p>
                {compressDays(
                  otherData.businessHoursCollection.items[0].daysOpen
                )}
                {otherData.businessHoursCollection.items[0].hours.join(", ")}
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
    </>
  );
};

export default StoreOpenStatus;
