import React from 'react';
import { View, Pressable, Text } from 'react-native';
import theme from '../../theme';
import FormikTextInput from '../FormikTextInput';

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={theme.formContainer}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <Pressable style={theme.submitBtn} onPress={onSubmit} testID="submitButton">
        <Text style={theme.submitBtnText} >Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;