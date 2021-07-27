import { gql } from "@apollo/client";

export const AUTHORIZE = gql`
  mutation Authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      repositoryId
      createdAt
      user {
        username
      }
      userId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
      createdAt
      reviewCount
    }
  }
`;