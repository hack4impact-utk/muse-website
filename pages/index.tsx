import { NextPage } from "next";
import Footer from "components/Footer";
import Head from "next/head";
import Header from "components/Header";
import InitialView from "components/Home/InitialView";

const Home: NextPage = () => {
  return (
    <main>
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
    </main>
  );
};

export default Home;
