import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  redBorder: {
    borderColor: '#d73a4a'
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    error && styles.redBorder
  ];

  return <NativeTextInput style={textInputStyle} {...props} testID="input" />;
};

export default TextInput;