import React from 'react';

import FormikTextInput from './FormikTextInput';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 5,
    padding: 5
  },
  signInButton: {
    borderWidth: 1,
    borderRadius: 2,
    margin: 4,
    padding: 13,
    backgroundColor: 'blue'
  },
  signInText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <Pressable style={styles.signInButton} onPress={onSubmit}>
        <Text style={styles.signInText} >Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;