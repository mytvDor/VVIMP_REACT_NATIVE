// // Update your existing screens or create a new screen where you want to use SwipeableCard

// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import SwipeableCard from './components/SwipeableCard';

// const YourScreen = () => {
//   const handleSwipeLeft = item => {
//     console.log(`Swiped left on ${item.name}`);
//     // Implement logic for left swipe action
//   };

//   const handleSwipeRight = item => {
//     console.log(`Swiped right on ${item.name}`);
//     // Implement logic for right swipe action
//   };

//   const data = [
//     {id: 1, name: 'Card 1'},
//     {id: 2, name: 'Card 2'},
//     {id: 3, name: 'Card 34'},
//   ];

//   return (
//     <View style={styles.container}>
//       {data.map(card => (
//         <SwipeableCard
//           key={card.id}
//           item={card}
//           onSwipeLeft={handleSwipeLeft}
//           onSwipeRight={handleSwipeRight}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f0f0f0',
//   },
// });

// export default YourScreen;
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SwipeableCard from './SwipeableCard'; // Update the import path as necessary

const YourScreen = ({data, onSwipeLeft, onSwipeRight}) => {
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        data.map(card => (
          <SwipeableCard
            key={card.id}
            item={card}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
          />
        ))
      ) : (
        <Text>No more cards to swipe!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default YourScreen;
