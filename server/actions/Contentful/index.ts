import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";
//* Must be imported before any query can be run.
export const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${
      process.env.CONTENTFUL_SPACE_ID as string
    }?access_token=${process.env.CONTENTFUL_DELIVERY_KEY as string}`,
    fetch,
  }),
  cache: new InMemoryCache(),
});

/**
 * @returns all Muse Exhibits from Contentful
 * Doesn't return Exhibit description because it isn't used in the frontend component.
 */
export const GET_ALL_EXHIBITS = gql`
  query getAllExhibits {
    ourExhibitsCollection {
      items {
        name
        picture {
          url
        }
      }
    }
  }
`;
/**
 * Get an Exhibit by its  name.
 * @returns An object containing information about the Exhibit.
 */
export const GET_EXHIBIT = gql`
  query getExhibitByName($name: String!) {
    ourExhibitsCollection(where: { name_contains: $name }) {
      items {
        name
        description
        picture {
          url
        }
      }
    }
  }
`;
/**
 * Retrieves business hours from Contentful.
 *
 */
export const GET_WEEKDAY_BUSINESS_HOURS = gql`
  query getBusinessHours {
    businessHoursCollection(where: { type_contains: "weekday" }) {
      items {
        hours
        daysOpen
        daysClosed
      }
    }
  }
`;

export const GET_WEEKEND_BUSINESS_HOURS = gql`
  query getBusinessHours {
    businessHoursCollection(where: { type_contains: "weekend" }) {
      items {
        hours
        daysOpen
        daysClosed
      }
    }
  }
`;
