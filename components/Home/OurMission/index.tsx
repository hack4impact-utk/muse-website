import { useQuery } from "@apollo/client";
import React from "react";
import { client, GET_SLIDESHOW_IMAGES } from "server/actions/Contentful";
import { clearTimeout, setTimeout } from "timers";
import styles from "./ourMission.module.scss";


const OurMission: React.FC = () => {
  const [imageNum, setImageNum] = React.useState(0);
  const {data, loading, error} = useQuery(GET_SLIDESHOW_IMAGES, {
    client: client,
  })


  React.useEffect(() => {
    //Change pictures every two seconds.
    const timeout = setTimeout(() => {
      if(data && data.slideshowImagesCollection.items.length > 0) {
        if(imageNum === data.slideshowImagesCollection.items.length - 1) {
          setImageNum(0);
        } else {
          setImageNum(imageNum + 1);
        }

      }
    }, 2000);
    return () => {
      clearTimeout(timeout);
    }
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap}>
        <h1>Welcome to Muse Knoxville</h1>

        <div className={styles.missionText}>
          {" "}
          Muse Knoxville is a children’s Science, Technology, Engineering, Arts, & Math (STEAM) museum located in Chilhowee Park. Our programs in the museum, in schools across East Tennessee, & throughout Knoxville bring STEM, the arts, health & wellness, & emergent literacy to life in the minds of children. We inspire & empower ALL children through transformative learning experiences through a variety of hands-on and inquiry-based, exhibits and Outreach programs for children aged 6 months to 10 years old.
        </div>

        <div className={styles.slideShow}>
          {data && data.slideshowImagesCollection.items && (
            <img src={data.slideshowImagesCollection.items[imageNum].image.url} alt="Slideshow image"/>
          )}
        </div>
         {/*         <img
          className={styles.saturn}
          src="/saturn.png"
          alt="Saturn icon for the Muse Knoxville."
        ></img>

        <img
          className={styles.astronaut}
          src="/astronaut.png"
          alt="Astronaut icon for the Muse Knoxville."
        ></img>

        <img
          className={styles.planet}
          src="/planet.png"
          alt="Planet icon for the Muse Knoxville."
        ></img> */}
      </div>
    </div>
  );
};

export default OurMission;
