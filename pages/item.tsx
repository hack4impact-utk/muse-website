import { NextPage } from "next";
import IndividualItem from "components/IndividualItem";
import Layout from "components/Layout";
import SuggestedItems from "components/SuggestedItems";
import React from "react";

const Item: NextPage = () => {
  return (
    <Layout>
      <IndividualItem />
      <SuggestedItems />
    </Layout>
  );
};

export default Item;
