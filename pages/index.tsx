import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/Layout";
import SuggestedItems from "../components/SuggestedItems/index";
const Home: NextPage = () => {
  return <SuggestedItems />;
};

export default Home;
