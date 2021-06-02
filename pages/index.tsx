import { NextPage } from "next";
import Head from "next/head";

import Header from "components/Header";
import Layout from "components/Layout";
import InitialView from "components/Home/InitialView";
import Exhibits from "components/Home/Exhibits";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Muse Knoxville</title>
      </Head>
      <InitialView />
      <Exhibits />
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
