import Layout from "components/shared/Layout";
import Head from "next/head";
import TicketDisplay from "components/tickets/TicketDisplay/index";
import TicketsCart from "components/tickets/TicketsCart/index";
import React from "react";
import useSWR from "swr";
import {NextPage} from "next";
import { BookeoProduct, BookeoProductAPIResponse } from "utils/types";
const TicketsPage: NextPage = () => {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error } = useSWR<BookeoProductAPIResponse>('/api/booking/products', fetcher)
  console.log(data && data);
  const options = {
    hero: true,
    heroSize: "md",
    heroText: "Reserve Your Play",
    wrapperDisabled: false,
    initialView: false,
  };
  return (
    <Layout options={options}>
      <Head>
        <title>Cart | Muse Knoxville</title>
      </Head>
      <TicketDisplay products={data && data.data as BookeoProduct[]}/>
    </Layout>
  );
};

export default TicketsPage;
