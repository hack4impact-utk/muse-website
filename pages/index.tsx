import { NextPage } from "next";
import Head from "next/head";
<<<<<<< HEAD
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
=======
import Header from "components/Header";
import OurMission from "../components/OurMission/index";
import Partners from "../components/Partners/index";
import IndividualItem from "../components/IndividualItem/index";

const Home: NextPage = () => {
  return <IndividualItem />;
>>>>>>> 3151971... Created individual item component
};

export default Home;
