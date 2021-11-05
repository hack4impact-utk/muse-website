import { NextPage } from "next";
import Head from "next/head";
<<<<<<< HEAD
import Partners from "components/home/Partners";
import OurMission from "components/home/OurMission";
import Layout from "components/shared/Layout";
import Exhibits from "components/home/Exhibits";
import BottomAnimation from "components/home/BottomAnimation";
=======
import Partners from "components/Home/Partners";
import OurMission from "components/Home/OurMission";
import Layout from "components/shared/Layout";
import Exhibits from "components/Home/Exhibits";
import BottomAnimation from "components/Home/BottomAnimation";
>>>>>>> 7aeb484a18a23ab2b3a57305124e1fe21b2a9367
const Home: NextPage = () => {
  return (
    <Layout options={{ initialView: true, wrapperDisabled: false }}>
      <Head>
        <title>Muse Knoxville</title>
      </Head>
      <OurMission />
      <Exhibits />
      <Partners />
      <BottomAnimation />
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: Arial;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
