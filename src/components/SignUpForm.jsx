import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { View, Pressable, Text } from 'react-native';
import FormikTextInput from './FormikTextInput';

import theme from './../theme';
import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import useSignIn from './../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username has to be at least 1 character long')
    .max(30, 'Username is too long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password has to be at least 5 characters long')
    .max(50, 'Password is too long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords don\'t match')
    .required('Password confirmation is required')
});

const SignUpForm = () => {
  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await mutate({
        variables: {
          user: {
            username,
            password
          }
        }
      });

      if (data) {
        await signIn({ username, password });
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) =>
        <View style={theme.formContainer}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
          <FormikTextInput name="passwordConfirmation" placeholder="Password confimation" secureTextEntry={true} />
          <Pressable style={theme.submitBtn} onPress={handleSubmit} >
            <Text style={theme.submitBtnText}>Sign up</Text>
          </Pressable>
        </View>
      }

    </Formik>
  );
};

export default SignUpForm;
