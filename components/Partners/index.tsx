import { NextPage } from "next";
import React from "react";
import { client, GET_ALL_PARTNERS } from "server/actions/Contentful";
import { useQuery } from "@apollo/client";
import { Partner, PartnersResponse } from "utils/types";
import styles from "./partners.module.scss";
const Partners: NextPage = () => {
  const [displayedGroupIndex, setDisplayedGroupIndex] = React.useState(0);

  const { data, loading, error } = useQuery<PartnersResponse>(
    GET_ALL_PARTNERS,
    {
      client: client,
    }
  );
  //This prevents this function from being called every single time the page is rendered. Should improve perfomance.
  //https://www.geeksforgeeks.org/react-js-usememo-hook/
  const groupedItems: Partner[][] = React.useMemo(() => {
    if (data && !loading && !error) {
      return data.partnersCollection.items
        .reduce(
          (groups: Partner[][], curr) => {
            const arr = groups[groups.length - 1];
            arr.push(curr);
            if (arr.length === 3) groups.push([]);
            return groups;
          },
          [[]]
        )
        .filter(chunk => chunk.length);
    }
    return [] as Partner[][];
  }, [data, error, loading]);

  //Comes from https://github.com/hack4impact-utk/mindversity-website/blob/develop/components/OfficerCarousel/index.tsx
  React.useEffect(() => {
    //Update the displayedGroupIndex to change what group is displayed.
    console.log(displayedGroupIndex);
    console.log("groupedItems length: ", groupedItems.length);
    if (groupedItems.length > 1) {
      const interval = setInterval(() => {
        setDisplayedGroupIndex(displayedGroupIndex + 1);
        //If the index goes over the length, then we need to loop back around to 0.
        if (displayedGroupIndex >= groupedItems.length - 1) {
          setDisplayedGroupIndex(0);
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [groupedItems, displayedGroupIndex]);

  return (
    <div className={styles.wrapper}>
      <h2>Thanks to our corporate partners!</h2>
      {data &&
        groupedItems.length > 0 &&
        groupedItems.map((group, index) => {
          return (
            <div
              className={`${styles.partnerGroup} ${
                displayedGroupIndex === index ? styles.show : styles.hide
              }`}
              key={index}
            >
              {group.map((partner, index) => {
                return (
                  <a
                    className={`${styles.partnerLink} `}
                    href={partner.url ? partner.url : "#"}
                    target="_blank"
                    rel="noreferrer"
                    key={index}
                  >
                    <img src={partner.image.url} alt={partner.name} />
                  </a>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default Partners;
