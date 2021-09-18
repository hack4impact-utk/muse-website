import Layout from "components/shared/Layout";
import Head from "next/head";
import React from "react";
const AtHome: React.FC = () => {
  const options = {
    hero: true,
    heroSize: "md",
    heroText: "We Bring the Museum to You",
    initialView: false,
    wrapperDisabled: false,
  };
  return (
    <Layout options={options}>
      <Head>
        <title>Muse at Home | Muse Knoxville</title>
      </Head>
    </Layout>
  );
};

export default AtHome;
