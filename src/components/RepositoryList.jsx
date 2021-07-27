import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => (
  <RepositoryItem item={item} testID="item" />
);

const parseVariables = (value) => {
  let variables;

  switch (value) {
    case "Latest":
      variables = { orderBy: "CREATED_AT", orderDirection: "DESC" };
      return variables;
    case "Highest rated":
      variables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      return variables;
    case "Lowest rated":
      variables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      return variables;
    default:
      return variables;
  }
};

export class RepositoryListContainer extends React.Component {

  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;

    return (
      <RepositoryListHeader
        sortingVariables={props.sortState}
        setSortingVariables={props.sortSetter}
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
      />
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortingQuery, setSortingQuery] = useState('Latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 750);
  const [queryVariables, setQueryVariables] = useState(parseVariables(sortingQuery));
  const { repositories, fetchMore } = useRepositories({ ...queryVariables, first: 5 });

  useEffect(() => {
    if (searchQuery) {
      setQueryVariables({ ...parseVariables(sortingQuery), searchKeyword: debouncedQuery, first: 5 });
    } else {
      setQueryVariables({ ...parseVariables(sortingQuery), first: 5 });
    }
  }, [debouncedQuery, sortingQuery]);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortState={sortingQuery}
      sortSetter={setSortingQuery}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;