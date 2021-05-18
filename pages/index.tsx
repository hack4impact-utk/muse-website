import { NextPage } from "next";
import Head from "next/head";
import InitialView from "components/Home/InitialView";
import OurMission from "components/OurMission";
import Layout from "components/Layout";

const Home: NextPage = () => {
  return (
    <Layout options={{initialView: true}}>
      <Head>
        <title>Muse Knoxville</title>
      </Head>
      <OurMission/>
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
