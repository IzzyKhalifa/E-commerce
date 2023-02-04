import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
    }
  }
`;

export const QUERY_ITEMDATA = gql`
  query allProducts {
    products {
      _id
      product_name
      price
      stock
      email
      url
    }

    profiles {
      _id
      name
      email
    }
  }
`;

export const QUERY_ACTIVE_ORDER = gql`
query orderActive {
  orderActive {
    _id
    products {
      _id
      product_name
      price
      stock
      email
      url
    }
    purchaseDate
  }
}
`;

export const QUERY_COMPLETED_ORDER = gql`
query orderCompleted {
    _id
    purchaseDate
    products {
      _id
      product_name
      price
      stock
      email
      url
    }
  }
`;