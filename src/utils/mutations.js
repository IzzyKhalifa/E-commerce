import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation AddProfile($name: String!, $password: String!, $email: String!) {
    addProfile(name: $name, password: $password, email: $email) {
      token
      profile {
        _id
        email
        name
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      products {
        _id
        product_name
        price
        stock
        email
        url
      }
      purchaseDate
      _id
    }
  }
`;

export const REMOVE_FROM_ORDER = gql`
  mutation removeFromOrder($orderId: ID!, $productId: ID!) {
  removeFromOrder(orderId: $orderId, productId: $productId) {
    _id
    products {
      _id
      email
      price
      product_name
      stock
      url
    }
  }
}

`;

export const CHECKOUT = gql`
  mutation checkout {
  checkout {
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
}
`;
