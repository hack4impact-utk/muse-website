import Layout from "components/Layout";
import SignIn from "components/SignIn";
import Head from "next/head";
import React from "react";

const SignInPage: React.FC = () => {
  const options = {
    hero: true,
    heroSize: "md",
    heroText: "Tickets Sign In",
    wrapperDisabled: true,
  };

  return (
    <Layout options={options}>
      <Head>
        <title>Sign In | Muse Knoxville</title>
      </Head>
      <SignIn />
    </Layout>
  );
};

export default SignInPage;
