import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

//* Must be imported before any query can be run.
export const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${
    process.env.CONTENTFUL_SPACE_ID as string
  }?access_token=${process.env.CONTENTFUL_DELIVERY_KEY as string}`,
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
        sys {
          id
        }
        name
        picture {
          url
        }
      }
    }
  }
`;
/**
 * Get an Exhibit by its Contentful ID.
 * @returns An object containing information about the Exhibit.
 */
export const GET_EXHIBIT = gql`
  query getExhibitById($id: String!) {
    ourExhibitsCollection(where: { sys: { id: $id } }) {
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
