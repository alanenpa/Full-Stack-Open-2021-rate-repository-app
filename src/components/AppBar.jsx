import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from './../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackGround
  },
  text: {
    color: 'white',
    margin: 7
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data, loading } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network'
  });
  if (loading) {
    return null;
  }
  const user = data.authorizedUser;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" linkTo="/" />
        {user && <AppBarTab text="Create a review" linkTo="/createreview" />}
        {user
          ? <Pressable onPress={signOut}>
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
          : <AppBarTab text="Sign in" linkTo="/signin" />
        }
        {!user && <AppBarTab text="Sign up" linkTo="/signup" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;