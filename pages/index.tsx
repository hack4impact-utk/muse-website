import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/Layout";
const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Muse Knoxville</title>
      </Head>
      <h1>This is our home page!</h1>
    </Layout>
  );
};

export default Home;
