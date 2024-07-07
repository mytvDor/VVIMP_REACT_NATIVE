// components/SwipeableCard.js

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const SwipeableCard = () => {
  const [data, setData] = useState([
    {id: 1, name: 'Card 1'},
    {id: 2, name: 'Card 2'},
    {id: 3, name: 'Card 3'},
    {id: 4, name: 'Card 4'},
  ]);

  const handleSwipeLeft = item => {
    console.log(`Swiped left on ${item.name}`);
    setData(prevData => prevData.filter(card => card.id !== item.id));
  };

  const handleSwipeRight = item => {
    console.log(`Swiped right on ${item.name}`);
    setData(prevData => prevData.filter(card => card.id !== item.id));
  };

  const renderCards = () => {
    return data.map((item, index) => {
      const pan = new Animated.ValueXY();

      const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (event, gesture) => {
          if (gesture.dx > SWIPE_THRESHOLD) {
            forceSwipe('right', item, pan);
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            forceSwipe('left', item, pan);
          } else {
            resetPosition(pan);
          }
        },
      });

      const forceSwipe = (direction, item, pan) => {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(pan, {
          toValue: {x, y: 0},
          duration: SWIPE_OUT_DURATION,
          useNativeDriver: false,
        }).start(() => completeSwipe(direction, item));
      };

      const resetPosition = pan => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      };

      const completeSwipe = (direction, item) => {
        direction === 'right' ? handleSwipeRight(item) : handleSwipeLeft(item);
      };

      const rotateCard = pan.x.interpolate({
        inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
        outputRange: ['-30deg', '0deg', '30deg'],
      });

      const animatedCardStyles = {
        transform: [
          {translateX: pan.x},
          {translateY: pan.y},
          {rotate: rotateCard},
        ],
      };

      return (
        <Animated.View
          key={item.id}
          {...panResponder.panHandlers}
          style={[
            styles.card,
            animatedCardStyles,
            {zIndex: data.length - index},
          ]}>
          <Text>{item.name}</Text>
        </Animated.View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {data.length > 0 ? renderCards() : <Text>No more cards to swipe!</Text>}
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
  card: {
    position: 'absolute',
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default SwipeableCard;
