// components/SwipeCard.js

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const SwipeCard = ({cardData}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: cardData.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{cardData.title}</Text>
        <Text style={styles.description}>{cardData.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default SwipeCard;
