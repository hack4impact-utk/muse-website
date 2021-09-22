import React from "react";
import styles from "./ourMission.module.scss";

const OurMission: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap}>
        <h1>Welcome to Muse Knoxville</h1>

        <div className={styles.missionText}>
          {" "}
          Muse Knoxville is a children’s Science, Technology, Engineering, Arts, & Math (STEAM) museum located in Chilhowee Park. Our programs in the museum, in schools across East Tennessee, & throughout Knoxville bring STEM, the arts, health & wellness, & emergent literacy to life in the minds of children. We inspire & empower ALL children through transformative learning experiences through a variety of hands-on and inquiry-based, exhibits and Outreach programs for children aged 6 months to 10 years old.
        </div>

        <div className={styles.coreValues}>
          <div className={styles.leftValue}>
            <img src={"/moon.png"} alt="Core value 1"></img>
            <h2>core value 1</h2>
            <div className={styles.description}>description here</div>
          </div>

          <div className={styles.rightValue}>
            <img src={"/moon.png"} alt="Core value 2"></img>
            <h2>core value 1</h2>
            <div className={styles.description}>description here</div>
          </div>

          <div className={styles.leftValue}>
            <img src={"/moon.png"} alt="Core value 3"></img>
            <h2>core value 1</h2>
            <div className={styles.description}>description here</div>
          </div>

          <div className={styles.rightValue}>
            <img src={"/moon.png"} alt="Core value 4"></img>
            <h2>core value 1</h2>
            <div className={styles.description}>description here</div>
          </div>
        </div>
        <img
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
        ></img>
      </div>
    </div>
  );
};

export default OurMission;
