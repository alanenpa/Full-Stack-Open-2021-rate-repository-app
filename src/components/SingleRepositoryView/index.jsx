import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Text from '../Text';
import RepositoryInfo from './RepositoryInfo';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPO } from '../../graphql/queries';

const ItemSeparator = () => <View style={styles.separator} />;

const parseDate = (date) => {
  const onlyDate = date.substr(0, 10);
  const parts = onlyDate.split('-');
  return parts[2] + "." + parts[1] + "." + parts[0];
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewItems1}>
        <View style={styles.ratingContainer}>
          <Text fontWeight="bold" style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.reviewItems2}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="secondary">{parseDate(review.createdAt)}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white',
  },
  reviewItems1: {
    flexDirection: 'row',
    padding: 7,
  },
  reviewItems2: {
    flexDirection: 'column',
    marginLeft: 5,
    padding: 5,
    flex: 1
  },
  ratingContainer: {
    alignContent: "center",
    flexGrow: 0
  },
  rating: {
    borderRadius: 180,
    padding: 15,
    borderWidth: 2,
    borderColor: 'blue',
    color: 'blue',
  },
  userName: {
    fontWeight: 'bold'
  },
  reviewText: {
    flex: 1,
    flexWrap: 'wrap'
  }
});

const SingleRepositoryView = () => {
  const id = useParams().id;

  const { data, loading, fetchMore } = useQuery(GET_SINGLE_REPO, { variables: { id, first: 5 } }, {
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first: 2
      },
    });
  };

  if (loading) {
    return null;
  }

  const repository = data.repository;
  const reviews = data.repository.reviews.edges;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepositoryView;