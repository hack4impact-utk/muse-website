import React from "react";
import { Item } from "utils/types";
import { GetStaticPropsContext, NextPage } from "next";
import { getItemByID, getItemsByCategory } from "server/actions/Square/Catalog";
import IndividualItem from "components/ecommerce/IndividualItem";
import Layout from "components/shared/Layout";

interface Props {
  item: Item;
}

const IndividualItemPage: NextPage<Props> = ({ item }) => {
  return (
    <Layout options={{ initialView: false, wrapperDisabled: false }}>
      <IndividualItem item={item} />
    </Layout>
  );
};

export default IndividualItemPage;

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ props: { item: Item }; revalidate: number }> {
  const item = await getItemByID(context.params?.item as string);

  return {
    props: {
      item: item,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths(): Promise<{
  paths: { params: { item: string } }[];
  fallback: boolean;
}> {
  const items = await getItemsByCategory([
    "Apparel",
    "Amusement Kits",
    "Learning Kits",
    "Toys",
  ]);
  const paths = items.map((item: Item) => ({
    params: { item: item.id },
  }));

  return { paths, fallback: true };
}
