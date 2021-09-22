import Layout from "components/shared/Layout";
import SignIn from "components/deprecated/SignIn";
import Head from "next/head";
import React from "react";

const SignInPage: React.FC = () => {
  const options = {
    /* hero: true, */
    /* heroSize: "md", */
    /* heroText: "Tickets Sign In", */
    wrapperDisabled: true,
    initialView: false,
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
