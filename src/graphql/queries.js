import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query getRepositories(
  $orderBy: AllRepositoriesOrderBy,
  $orderDirection: OrderDirection,
  $searchKeyword: String,
  $after: String,
  $first: Int
  ) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      after: $after,
      first: $first
    ) {
      totalCount
      edges {
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          forksCount
          openIssuesCount
          url
          ownerAvatarUrl
          description
          language
          authorizedUserHasReviewed
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
}
`;

export const AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id
    username
  }
}
`;

export const GET_SINGLE_REPO = gql`
query SingleRepo(
  $id: ID!,
  $after: String,
  $first: Int
  ) {
  repository(
    id: $id
  ) {
    id
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    forksCount
    openIssuesCount
    url
    ownerAvatarUrl
    description
    language
    authorizedUserHasReviewed
    reviews(
      after: $after,
      first: $first
    ) {
      totalCount
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
}
`;