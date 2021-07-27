import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import SignIn from './SignIn';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUpForm />
        </Route>
        <Route path="/createreview" exact>
          <ReviewForm />
        </Route>
        <Route path="/repository/:id" exact>
          <SingleRepositoryView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;