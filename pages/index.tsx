import { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Muse Knoxville</title>
      </Head>
      <Header />
      <h1>This is our home page!</h1>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: Arial;
        }
      `}</style>
    </main>
  );
};

export default Home;
