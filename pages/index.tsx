import { NextPage } from "next";
import Layout from "components/Layout";
const Home: NextPage = () => {
  const options = {
    hero: true,
    heroSize: "sm",
    heroText: "Test hero",
  };
  return <Layout options={options}>This is inside the layout</Layout>;
};

export default Home;
