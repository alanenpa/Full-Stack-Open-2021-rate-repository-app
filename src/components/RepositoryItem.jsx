import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';
import Text from '../components/Text';
import theme from '../theme';
import { useHistory } from 'react-router-native';

export const roundToThousands = (number) => {
  if (number >= 1000) {
    number = (number.toPrecision(2)).substr(0, 3) + 'k';
  }
  return number;
};

const RepositoryItem = ({ item }) => {
  const history = useHistory();
  const stargazersCount = roundToThousands(item.stargazersCount);
  const forksCount = roundToThousands(item.forksCount);

  const handleClick = () => {
    history.push(`repository/${item.id}`);
  };

  return (
    <Pressable onPress={handleClick}>
      <View style={styles.container} testID="item">
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: item.ownerAvatarUrl }}
          />
          <View style={styles.headerTexts}>
            <Text style={styles.headerTextItem} fontWeight="bold">{item.fullName}</Text>
            <Text style={styles.headerTextItem}>{item.description}</Text>
            <View style={styles.languageItemParent}>
              <Text style={styles.language}>{item.language}</Text>
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
            <Text style={styles.boldCenter}>{item.reviewCount}</Text>
            <Text>Reviews</Text>
          </View>
          <View>
            <Text style={styles.boldCenter}>{item.ratingAverage}</Text>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10
  },
  headerTexts: {
    flexDirection: 'column',
    flex: 1
  },
  headerTextItem: {
    paddingBottom: 4,
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
  }
});

export default RepositoryItem;