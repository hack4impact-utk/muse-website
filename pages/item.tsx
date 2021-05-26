import IndividualItem from "components/IndividualItem";
import Layout from "components/Layout";
import SuggestedItems from "components/SuggestedItems";
import React from "react";

export default function Item() {

    return (
        <Layout>
            <IndividualItem/>
            <SuggestedItems/>
        </Layout>
    )
}