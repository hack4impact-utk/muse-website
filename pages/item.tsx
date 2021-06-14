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

<<<<<<< HEAD
    return (
        <Layout>
            <IndividualItem/>
            <SuggestedItems/>
        </Layout>
    )
}
=======
export default Item;
>>>>>>> dcfb0f5e9352a39a1b458eed1c119f7197b107dd
