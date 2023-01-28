import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation AddProfile($name: String!, $password: String!, $email: String!) {
    addProfile(name: $name, password: $password, email: $email) {
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

export const ADD_TO_CART = gql`
  mutation addToCart($productId: ID!) {
    addToCart(productId: $productId) {
      id
      name
      price
    }
  }
`;

export const CHECKOUT = gql`
  mutation checkout($token: String!) {
    checkout(token: $token) {
      id
      amount
      currency
      status
    }
  }
`;
