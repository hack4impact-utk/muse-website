import React from "react";
import styles from "./ourMission.module.scss";

const OurMission: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap}>
        <h1> Our Mission </h1>

        <div className={styles.missionText}>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis
          sagittis diam. Nam consequat nisi vel risus pretium, eu euismod mauris
          volutpat. Aliquam varius convallis diam nec iaculis. Phasellus eros
          justo, rutrum in odio a, convallis pharetra lacus. Aenean accumsan
          risus mauris, quis pharetra ipsum rhoncus id. Nam gravida orci in
          libero dictum fringilla. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Phasellus semper accumsan
          iaculis. Donec sit amet porttitor sem, at vulputate lacus. Mauris
          varius tortor at mollis placerat. Vivamus ut lectus eu dui rutrum
          malesuada nec in odio.
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
