import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { View, Pressable, Text } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';
import theme from '../theme';


const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating has to be at least 0')
    .max(100, 'Rating has to be 100 at most')
    .required('Rating is required'),
  text: yup
    .string()
    .notRequired()
});

const ReviewForm = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text
          }
        }
      });

      if (data) {
        const review = data.createReview;
        history.push(`/repository/${review.repositoryId}`);
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
          <FormikTextInput name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="text" multiline="true" placeholder="Review" />
          <Pressable style={theme.submitBtn} onPress={handleSubmit} >
            <Text style={theme.submitBtnText}>Create a review</Text>
          </Pressable>
        </View>
      }

    </Formik>
  );
};

export default ReviewForm;
