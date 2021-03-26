import { NextPage } from "next";
import Head from "next/head";

import Header from "components/Header";
import InitialView from "components/Home/InitialView";
import Layout from "components/Layout";
        
const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Muse Knoxville</title>
      </Head>
      <Header />
      <InitialView />
      <Footer />
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
