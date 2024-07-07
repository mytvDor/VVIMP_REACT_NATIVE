// components/SwipingFeature.js

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SwipeCard from './SwipeCard';

const SwipingFeature = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Card 1',
      description: 'Description for Card 1',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1rIWZdIa6hfBRsNAFtrRjPFreZQj9Zomtgg&s',
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'Description for Card 2',
      image: 'https://i.redd.it/pu98r7kkzsq81.jpg',
    },
    // Add more cards as needed
  ]);

  return (
    <View style={styles.container}>
      {cards.map(card => (
        <SwipeCard key={card.id} cardData={card} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default SwipingFeature;
