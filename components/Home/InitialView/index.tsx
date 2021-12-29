import React from "react";
import style from "./initialview.module.scss";

const InitialView: React.FC = () => {
  return (
    <div className={style.parent}>
      <div className={style.textParent}>
        <h1>
          We Inspire &<br></br>Empower
        </h1>
        <div className={style.ctaButtonWrapper}>
          <a href="/memberships" className={style.ctaButton}>
            Memberships
          </a>
        </div>
      </div>
      <img
        className={style.gearGreen}
        src="gear-green.png"
        alt="Green gear for the Muse Knoxville."
      ></img>
      <img
        className={style.gearYellow}
        src="gear-yellow.png"
        alt="Yellow gear for the Muse Knoxville."
      ></img>
      <div className={style.videoWrapper}>
        <div className={style.videoOverlay}></div>
        <video className={style.video} src="opener.mp4" autoPlay muted loop></video>
      </div>
    </div>
  );
};

export default InitialView;
