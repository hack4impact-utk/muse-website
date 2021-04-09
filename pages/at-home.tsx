import Layout from "components/Layout";
import Head from "next/head";
import React from "react";
const AtHome: React.FC = () => {
  const options = {
    hero: true,
    heroSize: "md",
    heroText: "We Bring the Museum to You",
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
