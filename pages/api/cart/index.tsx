import { NextApiRequest, NextApiResponse } from "next";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === "GET") {
    const client = new ApolloClient({
      uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}?access_token=${process.env.CONTENTFUL_DELIVERY_KEY}`, 
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query getBusinessHours {
            businessHoursCollection {
              items {
                type
                dateEffective
                open
                close
              }
            }
          }
        `,
      })
      .then(data => console.log(data.data.businessHoursCollection.items));
    res.status(200).json({
      success: true,
      payload: "Trevor",
    });
  }
}
