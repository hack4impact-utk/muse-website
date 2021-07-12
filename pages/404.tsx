import { NextPage } from "next";
import Header from "components/Header";
import Footer from "components/Footer";

const FourOhFour: NextPage = () => {
  return (
    <main>
      <Header />

      <div className="container">
        <img src={"/astronaut.png"} alt="Astronaut" />
        <img src={"/planet.png"} alt="Planet" />
        <div className="wrapper">
          <h1>404 Page Not Found</h1>
          <h1>
            We could astro-
            <span>NAUT </span>
            find your page.
          </h1>
          <h1>
            For our next page expedition, we should
            <span> PLAN-ET </span>
            better.
          </h1>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        h1 {
          margin: 0;
        }
      `}</style>
      <style jsx>{`
        div.container {
          height: calc(100vh - 158px);
          position: relative;
          background-color: #f99e26;
          overflow: hidden;
        }
        @keyframes bob {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-25px);
          }
        }
        @keyframes rotate {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        img {
          position: absolute;
        }
        img:nth-of-type(1) {
          width: 360px;
          top: 0;
          left: 20px;
          animation: bob 2s ease-in-out infinite alternate;
        }
        img:nth-of-type(2) {
          width: 300px;
          bottom: 40px;
          right: 40px;
          animation: rotate 30s linear infinite;
        }
        @media only screen and (max-width: 1300px) {
          img:nth-of-type(1) {
            width: 300px;
          }
          img:nth-of-type(2) {
            width: 240px;
          }
        }
        @media only screen and (max-width: 650px) {
          img:nth-of-type(1) {
            width: 240px;
          }
          img:nth-of-type(2) {
            width: 180px;
          }
        }
        div.wrapper {
          width: 600px;
          position: absolute;
          top: 40%;
          left: 0;
          right: 0;
          margin: 0 auto;
          text-align: center;
        }
        div.wrapper h1 {
          color: #ffffff;
          font-weight: 400;
        }
        div.wrapper h1 span {
          font-weight: 900;
        }
        @media only screen and (max-width: 1300px) {
          div.wrapper h1 {
            font-size: 1.5em;
          }
        }
        @media only screen and (max-width: 650px)
        {
          div.wrapper {
            width: 95%;
          }
          div.wrapper h1 {
            font-size: 1.25em;
          }
        }
      `}</style>
    </main>
  );
};

export default FourOhFour;