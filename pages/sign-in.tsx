import Layout from "components/Layout";
import Head from "next/head";
import React from "react";
const SignIn: React.FC = () => {
  const options = {
    hero: true,
    heroSize: "md",
    heroText: "Tickets Sign In",
  };
  return (
    <Layout options={options}>
      <Head>
        <title>Sign In | Muse Knoxville</title>
      </Head>
    </Layout>
  );
};

export default SignIn;
