import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";
//* Must be imported before any query can be run.
const uri = `https://graphql.contentful.com/content/v1/spaces/${
  process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_KEY as string}`;
export const client = new ApolloClient({
  link: new HttpLink({
    uri: uri,
    fetch,
  }),
  cache: new InMemoryCache(),
});

/**
 * @returns all Muse Exhibits from Contentful
 */
export const GET_ALL_EXHIBITS = gql`
  query getAllExhibits {
    ourExhibitsCollection {
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

/**
 * Gets information of all partners
 *
 */
export const GET_ALL_PARTNERS = gql`
  query getAllPartners {
    partnersCollection {
      items {
        name
        image {
          url
        }
        url
      }
    }
  }
`;
/**
 *
 * Retrieves weekend business hours from Contentful.
 */
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
/**
 * Gets information for specified partner
 *
 */
export const GET_PARTNER = gql`
  query getPartnerByName($name: String!) {
    partnersCollection(where: { name_contains: $name }) {
      items {
        name
        image {
          url
        }
        url
      }
    }
  }
`;
/**
 * Get slideshow images for homepage slideshow
 */
export const GET_SLIDESHOW_IMAGES = gql`
  query getSlideshowImages {
    slideshowImagesCollection {
      items {
        image {
          url
        }
      }
    }
  }
`