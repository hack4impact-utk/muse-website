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

  const windowSize = useWindowSize();
  const [exhibitIndexToDisplay, setExhibitIndexToDisplay] = React.useState(0);
  //If there are exhibits to display, break them down in to groups.
  let groupedExhibits = [] as Exhibit[][];
  if (data) {
    groupedExhibits = data.ourExhibitsCollection.items.reduce(
      (groups: Exhibit[][], curr) => {
        const arr = groups[groups.length - 1];
        arr.push(curr);
        if (arr.length === 3) groups.push([]);
        return groups;
      },
      [[]]
    );
  }
  //Move to the previous set of exhibits.
  const goPrevious = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const maximumIndex = groupedExhibits.length - 1;
    if (exhibitIndexToDisplay === 0) {
      setExhibitIndexToDisplay(maximumIndex);
    } else {
      setExhibitIndexToDisplay(exhibitIndexToDisplay - 1);
    }
  };
  //Move to the next set of exhibits.
  const goNext = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const maximumIndex = groupedExhibits.length - 1;
    if (exhibitIndexToDisplay === maximumIndex) {
      setExhibitIndexToDisplay(0);
    } else {
      setExhibitIndexToDisplay(exhibitIndexToDisplay + 1);
    }
  };

  // Hook from: https://usehooks.com/useWindowSize/
  // Needed to adjust the number of exhibits that display based on screen size
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = React.useState({
      width: 0,
      height: 0,
    });
    React.useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  return (
    <section className={styles.exhibitsContainer}>
      <h2>Our Exhibits</h2>
      {data && !loading && !error && groupedExhibits.length > 0 && (
        <div className={styles.exhibitsWrapper}>
          <button onClick={goPrevious}>
            <div>
              <HiChevronLeft className={styles.exhibitsButtonIcon} />
            </div>
          </button>
          {groupedExhibits.map((group, index) => {
            return (
              <div
                key={index}
                className={
                  exhibitIndexToDisplay === index ? styles.show : styles.hide
                }
              >
                {group.map((exhibit, index) => {
                  return (
                    <div key={index} className={styles.exhibit}>
                      <div className={styles.exhibitOverlay}></div>
                      <img src={exhibit.picture.url} />
                      <h3>{exhibit.name}</h3>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <button onClick={goNext}>
            <div>
              <HiChevronRight className={styles.exhibitsButtonIcon} />
            </div>
          </button>
        </div>
      )}
    </section>
  );
};

export default Exhibits;
