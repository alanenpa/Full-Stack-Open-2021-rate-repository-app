import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";
import { AUTHORIZE } from './../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });

    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    history.push("/");

  };

  return [signIn, result];
};

export default useSignIn;