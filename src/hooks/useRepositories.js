import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  let repositories = null;

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  if (data) {
    repositories = data.repositories;
  }

  return { repositories, loading };
};

export default useRepositories;