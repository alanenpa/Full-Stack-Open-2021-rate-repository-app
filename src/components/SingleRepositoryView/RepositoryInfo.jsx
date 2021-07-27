import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import Text from '../Text';
import theme from '../../theme';

export const roundToThousands = (number) => {
  if (number >= 1000) {
    number = (number.toPrecision(2)).substr(0, 3) + 'k';
  }
  return number;
};

const handleClick = (url) => {
  Linking.openURL(url);
};

const RepositoryInfo = ({ repository }) => {

  const stargazersCount = roundToThousands(repository.stargazersCount);
  const forksCount = roundToThousands(repository.forksCount);

  return (
    <View style={styles.container} testID="item">
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.headerTexts}>
          <Text style={styles.headerTextItem} fontWeight="bold">{repository.fullName}</Text>
          <Text style={styles.headerTextItem}>{repository.description}</Text>
          <View style={styles.languageItemParent}>
            <Text style={styles.language}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.footerItem}>
        <View>
          <Text style={styles.boldCenter}>{stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View>
          <Text style={styles.boldCenter}>{forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View>
          <Text style={styles.boldCenter}>{repository.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View>
          <Text style={styles.boldCenter}>{repository.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => handleClick(repository.url)}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white',
    marginBottom : 10
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10
  },
  headerTexts: {
    flexDirection: 'column',
  },
  headerTextItem: {
    paddingBottom: 4
  },
  languageItemParent: {
    flexDirection: 'row'
  },
  language: {
    flexGrow: 0,
    padding: 3,
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: 3
  },
  avatar: {
    marginRight: 10,
    width: 50,
    height: 50
  },
  footerItem: {
    flexDirection: 'row',
    marginLeft: 4,
    justifyContent: 'space-evenly'
  },
  boldCenter: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 18,
    margin: 4,
    padding: 13,
    backgroundColor: 'blue'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default RepositoryInfo;