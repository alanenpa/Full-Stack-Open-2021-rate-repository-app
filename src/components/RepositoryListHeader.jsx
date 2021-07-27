import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet } from 'react-native';
import SearchbarComponent from './SearchbarComponent';

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

const RepositoryListHeader = ({ sortingVariables, setSortingVariables, searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <SearchbarComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Picker
        selectedValue={sortingVariables}
        onValueChange={(itemValue) =>
          setSortingVariables(itemValue)
        }
        prompt="Select an item...">
        <Picker.Item label="Latest repositories" value="Latest" />
        <Picker.Item label="Highest rated repositories" value="Highest rated" />
        <Picker.Item label="Lowest rated repositories" value="Lowest rated" />
      </Picker>
    </View>
  );
};

export default RepositoryListHeader;