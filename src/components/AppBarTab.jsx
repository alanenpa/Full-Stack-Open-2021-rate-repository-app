import React from 'react';
import { StyleSheet, Pressable as View, Text } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  text: {
    color: 'white',
    margin: 7
  }
});

const AppBarTab = ({ text, linkTo }) => {
  return (
    <View>
      <Link to={linkTo}><Text style={styles.text}>{text}</Text></Link>
    </View>
  );
};

export default AppBarTab;