import { NextPage } from "next";
import Head from "next/head";
import Partners from "components/Partners";
import OurMission from "components/OurMission";
import Layout from "components/Layout";
const Home: NextPage = () => {
  return (
    <Layout options={{ initialView: true, wrapperDisabled: false }}>
      <Head>
        <title>Muse Knoxville</title>
      </Head>
      <OurMission />
      <Partners />
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
