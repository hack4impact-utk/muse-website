import React from "react";
import style from "./exhibits.module.scss";
import { client, GET_ALL_EXHIBITS } from "server/actions/Contentful";
import { useQuery } from "@apollo/client";
import { ExhibitResponse } from "utils/types";

const Exhibits: React.FC = () => {

  //Query to get the exhibits
  const exhibitsQuery = GET_ALL_EXHIBITS;
  const{
    loading: exhibitsLoading,
    data: exhibitsData,
    error: exhibitsError,
  } = useQuery<ExhibitResponse>(exhibitsQuery, {
    client: client,
    pollInterval: 3600000, //Get every hour
  });


  let groupedExhibits = [] as ExhibitResponse[][];
  if(exhibitsData){
    groupedExhibits = exhibitsData.ourExhibitsCollection.items
      .reduce(
        (groups: ExhibitResponse[][], curr) => {
          const arr = groups[groups.length - 1];
          arr.push(curr);
          if (arr.length === 3) groups.push([]);
          return groups;
        },
        [[]]
      )
      .filter(chunk => chunk.length);
  }


  return (
    <div className={style.parent}>
      <h2 className={style.exhibitsTitle}>Our Exhibits</h2>
      
      {
        groupedExhibits.map((group, index) => {
          return(
            <div key={index}>
              {
                group.map((exhibit, index) => {
                  return <div key={index}/>;
                })
              }
            </div>
          )
        })
      }

      <div className={style.cardWrapper}>
        { 
          exhibitsData?.ourExhibitsCollection.items.map(item => {
            return(


              <a href={"exhibits/" + item.sys.id}>
                <div className={style.card}>
                  <div className={style.cardTitle}>
                    {item.name}
                  </div>
                  <div className={style.cardImage}>
                    <div className={style.cardImageOverlay}></div>
                    <img src={item.picture?.url}></img>
                  </div>
                </div>
              </a>


            )
          })
        }
      </div>
    </div>
  );
};

export default Exhibits;
