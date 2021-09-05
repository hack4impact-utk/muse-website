import React from "react";
import styles from "./exhibits.module.scss";
import { useQuery } from "@apollo/client";
import { client, GET_ALL_EXHIBITS } from "server/actions/Contentful";
import { Exhibit } from "utils/types";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

const Exhibits: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_EXHIBITS, {
    client: client,
  });
  const [exhibitIndexToDisplay, setExhibitIndexToDisplay] = React.useState(0);
  let groupedExhibits = [] as Exhibit[][];
  if (data) {
    groupedExhibits = data.ourExhibitsCollection.items.reduce(
      (groups: Exhibit[][], curr) => {
        const arr = groups[groups.length - 1];
        arr.push(curr);
        if (arr.length === 4) groups.push([]);
        return groups;
      },
      [[]]
    );
  }
  const goPrevious = (e:React.SyntheticEvent) => {
      e.preventDefault();
      const maximumIndex = groupedExhibits.length - 1;
      if(exhibitIndexToDisplay === 0) {
          setExhibitIndexToDisplay(maximumIndex);
      } else {
          setExhibitIndexToDisplay(exhibitIndexToDisplay - 1)
      }

      
  }
  const goNext = (e:React.SyntheticEvent) => {
      e.preventDefault();
      const maximumIndex = groupedExhibits.length- 1;
      if(exhibitIndexToDisplay === maximumIndex) {
          setExhibitIndexToDisplay(0);
      } else {
          setExhibitIndexToDisplay(exhibitIndexToDisplay + 1);
      }
  }
  return (
    <section className={styles.exhibitsContainer}>
      <div className={styles.exhibitsWrapper}>
        <button onClick={goPrevious}>
          <div><HiChevronLeft className={styles.exhibitsBuuttonIcon}/></div>
        </button>
        {data &&
          !loading &&
          !error &&
          groupedExhibits.length > 0 &&
          groupedExhibits.map((group, index) => {
            return (
              <div key={index} className={exhibitIndexToDisplay === index ? styles.show : styles.hide}>
                <h1>{index}</h1>
                {group.map((exhibit, index) => {
                  return (
                    <div className={styles.exhibit}>
                      <div className={styles.exhibitOverlay}>
                        <h3>{exhibit.name}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        <button onClick={goNext}>
          <div><HiChevronRight className={styles.exhibitsBuuttonIcon}/></div>
        </button>
      </div>
    </section>
  );
};

export default Exhibits;
