import styles from "./footer.module.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import {
  GET_WEEKDAY_BUSINESS_HOURS,
  GET_WEEKEND_BUSINESS_HOURS,
  client,
} from "server/actions/Contentful";
import { compressDays } from "utils/helpers";

const Footer: React.FC = () => {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25758.679140926608!2d-83.94080239265877!3d35.985431235796526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885c16f484d1dbdb%3A0x1612d2810873bf5e!2sMuse%20Knoxville!5e0!3m2!1sen!2sus!4v1612997623235!5m2!1sen!2sus";

  const { data: wd, loading: wdl, error: wde } = useQuery(
    GET_WEEKDAY_BUSINESS_HOURS,
    {
      client: client,
    }
  );
  const { data: we, loading: wel, error: wee } = useQuery(
    GET_WEEKEND_BUSINESS_HOURS,
    {
      client: client,
    }
  );
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
            516 N. Beaman St.
            <br />
            Knoxville, TN 37914
          </p>
          <p className={styles.headerText}>
            <a href="mailto:info@themuseknoxville.org">
              info@themuseknoxville.org
            </a>
          </p>
          <p>
            <a className={styles.phone} href="tel:865-594-1494">
              (865) 594-1494
            </a>
          </p>
          <h1 className={styles.headerText}>
            HOURS - <span>Admission must be booked online, in advance</span>
          </h1>
          <p>Special Programs Monday & Thursday</p>
          {wd && !wdl && (
            <p className={styles.hours}>
              {compressDays(wd.businessHoursCollection.items[0].daysOpen)}
              {wd.businessHoursCollection.items[0].hours.join(", ")}
            </p>
          )}
          {we && !wel && (
            <p className={styles.hours}>
              {compressDays(we.businessHoursCollection.items[0].daysOpen)}
              {we.businessHoursCollection.items[0].hours.join(", ")}
            </p>
          )}
          {/*<p>Friday - 10am-12pm, 1-3pm, 3:30-5:30pm</p>
          <p>Saturday - 10am-12pm, 1-3pm, 3:30-5:30pm</p>
          <p>Sunday - 10am-12pm, 1-3pm</p> */}

          <div className={styles.smContainer}>
            <a
              href="https://www.facebook.com/MuseKnoxville/"
              rel="noreferrer"
              target="_blank"
            >
              <button>
                <FaFacebookF />
              </button>
            </a>
            <a
              href="https://www.instagram.com/museknox/"
              rel="noreferrer"
              target="_blank"
            >
              <button>
                <FaInstagram />
              </button>
            </a>
            <a
              href="https://twitter.com/MuseKnox"
              rel="noreferrer"
              target="_blank"
            >
              <button>
                <FaTwitter />
              </button>
            </a>
            <a
              href="https://www.youtube.com/channel/UC4b-RIBm744vaDDlWX55pyQ"
              rel="noreferrer"
              target="_blank"
            >
              <button>
                <FaYoutube />
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Visit</h2>
          <a href="plan-visit">Plan Your Visit</a>
          <a href="reopening-info">Reopening Info</a>
          <a href="memberships">Memberships</a>
          <a href="faqs">Visitor FAQs</a>
          <a href="field-trips">Field Trips</a>
          <a href="free-family-night">Free Family Night</a>
          <a href="link">Link</a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Event Bookings</h2>
          <a href="birthdays">Birthdays</a>
          <a href="rentals">Museum Rentals</a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Educators</h2>
          <a href="field-trips">Field Trips</a>
          <a href="outreach">Outreach (In-School)</a>
          <a href="preschool">Preschool</a>
          <a href="homeschool">Homeschool</a>
          <a href="family-events">Family STEAM Events</a>
          <a href="community-events">Community Events</a>
          <a href="mobile-planetarium">Mobile Planetarium</a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Experiences</h2>
          <a href="exhibits-and-play-spaces">Exhibits and Play Spaces</a>
          <a href="muse-at-home">Muse at Home</a>
          <a href="amusement-kits">Amusement Kits</a>
          <a href="on-site-programs">On-Site Programs</a>
          <a href="learning-pods">
            <span>Learning Pods</span>
          </a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>About Us</h2>
          <a href="mission-and-history">Mission & History</a>
          <a href="leadership">Leadership</a>
          <a href="enewsletter">Muse eNewsletter</a>
          <a href="press">Press</a>
          <a href="contact-us">Contact Us</a>
        </div>
        <div className={`${styles.column} ${styles.links}`}>
          <h2>Join+Support</h2>
          <a href="donate-now">Donate Now</a>
          <a href="volunteer">Volunteer</a>
          <a href="scholarships">Muse for All Scholarships</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
