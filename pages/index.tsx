import { NextPage } from "next";
import Head from "next/head";
import Partners from "components/Home/Partners";
import OurMission from "components/Home/OurMission";
import Layout from "components/shared/Layout";
import Exhibits from "components/Home/Exhibits";
import BottomAnimation from "components/Home/BottomAnimation";
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
