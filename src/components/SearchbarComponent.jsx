import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  }
});

const SearchbarComponent = ({ searchQuery, setSearchQuery }) => {

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
};

export default SearchbarComponent;