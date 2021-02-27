import styles from "./footer.module.scss";
import { FaFacebookF,FaInstagram,FaTwitter,FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {

  const mapSrc: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25758.679140926608!2d-83.94080239265877!3d35.985431235796526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885c16f484d1dbdb%3A0x1612d2810873bf5e!2sMuse%20Knoxville!5e0!3m2!1sen!2sus!4v1612997623235!5m2!1sen!2sus";

  return (
    <footer className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.column} ${styles.map}`}>
          <iframe title="Muse Location" src={mapSrc}></iframe>
        </div>
        <div className={`${styles.column} ${styles.information}`}>
          <h1>CONTACT INFORMATION</h1>
          <h1 className={styles.headerText}>ADDRESS</h1>
          <p>
            516 N. Beaman St.<br />
            Knoxville, TN 37914
          </p>
          <p className={styles.headerText}><a href="mailto:info@themuseknoxville.org">info@themuseknoxville.org</a></p>
          <p><a className={styles.phone} href="tel:865-594-1494">(865) 594-1494</a></p>
          <h1 className={styles.headerText}>
            HOURS - <span>Admission must be booked online, in advance</span>
          </h1>
          <p>Special Programs Monday & Thursday</p>
          <p>Friday - 10am-12pm, 1-3pm, 3:30-5:30pm</p>
          <p>Saturday - 10am-12pm, 1-3pm, 3:30-5:30pm</p>
          <p>Sunday - 10am-12pm, 1-3pm</p>
          <div className={styles.smContainer}>
            <a href="https://www.facebook.com/MuseKnoxville/" rel="noreferrer" target="_blank"><button><FaFacebookF /></button></a>
            <a href="https://www.instagram.com/museknox/" rel="noreferrer" target="_blank"><button><FaInstagram /></button></a>
            <a href="https://twitter.com/MuseKnox" rel="noreferrer" target="_blank"><button><FaTwitter /></button></a>
            <a href="https://www.youtube.com/channel/UC4b-RIBm744vaDDlWX55pyQ" rel="noreferrer" target="_blank"><button><FaYoutube /></button></a>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Visit</h2>
          <a href="#">Plan Your Visit</a>
          <a href="#">Reopening Info</a>
          <a href="#">Memberships</a>
          <a href="#">Visitor FAQs</a>
          <a href="#">Field Trips</a>
          <a href="#">Free Family Night</a>
          <a href="#">Link</a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Event Bookings</h2>
          <a href="#">Birthdays</a>
          <a href="#">Museum Rentals</a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Educators</h2>
          <a href="#">Field Trips</a>
          <a href="#">Outreach (In-School)</a>
          <a href="#">Preschool</a>
          <a href="#">Homeschool</a>
          <a href="#">Family STEAM Events</a>
          <a href="#">Community Events</a>
          <a href="#">Mobile Planetarium</a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Experiences</h2>
          <a href="#">Exhibits and Play Spaces</a>
          <a href="#">Muse at Home</a>
          <a href="#">Amusement Kits</a>
          <a href="#">On-Site Programs</a>
          <a href="#"><span>Learning Pods</span></a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>About Us</h2>
          <a href="#">Mission & History</a>
          <a href="#">Leadership</a>
          <a href="#">Muse eNewsletter</a>
          <a href="#">Press</a>
          <a href="#">Contact Us</a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Join+Support</h2>
          <a href="#">Donate Now</a>
          <a href="#">Volunteer</a>
          <a href="#">Muse for All Scholarships</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;