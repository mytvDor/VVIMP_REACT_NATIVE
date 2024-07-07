import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';

import Icon4 from 'react-native-vector-icons/AntDesign';
import 'react-native-gesture-handler';
import SwipingFeature from './Components/SwipingFeature';
import SwipeableCard from './Components/SwipeableCard';
import Payment from './Components/Payment';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = ({
  navigation,
  user,
  setUser,
  profilePhoto,
  setProfilePhoto,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    setUser({name, email});
    navigation.navigate('Profile');
  };

  const handlePickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfilePhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {profilePhoto ? (
          <Image source={{uri: profilePhoto}} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text>No Photo Selected</Text>
          </View>
        )}
        <Button title="Pick a Photo" onPress={handlePickImage} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const ProfileScreen = ({navigation, user, profilePhoto}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {profilePhoto ? (
          <Image source={{uri: profilePhoto}} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text>No Photo Selected</Text>
          </View>
        )}
      </View>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('Edit Profile')}
      />
    </View>
  );
};

function StackNav({user, setUser, profilePhoto, setProfilePhoto}) {
  return (
    <Stack.Navigator initialRouteName="Profile" options={{headerShown: false}}>
      <Stack.Screen
        name="Edit Profile"
        options={({navigation}) => ({
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              {/* <Icon2 name="menu" size={25} style={{marginLeft: 15}} />
              <Icon3 name="rocket" size={30} /> */}
            </TouchableOpacity>
          ),
        })}>
        {props => (
          <HomeScreen
            {...props}
            user={user}
            setUser={setUser}
            profilePhoto={profilePhoto}
            setProfilePhoto={setProfilePhoto}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile" options={{headerShown: false}}>
        {props => (
          <ProfileScreen {...props} user={user} profilePhoto={profilePhoto} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function TabNav({navigation}) {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'myprofile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Search') {
            iconName = 'search1';
            return <Icon4 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Subscription') {
            iconName = focused ? 'card' : 'card-outline';
            return <Icon name={iconName} size={size} color={color} />;
          }
        },

        tabBarShowLabel: true,
        tabBarActiveTintColor: '#d90238',
        tabBarInactiveTintColor: 'grey',
        headerStyle: {
          backgroundColor: '#d90238', // Example header background color
        },
        headerTintColor: '#fff', // Example header text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon
              name="menu-outline"
              size={30}
              color="#fff"
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
        ),
      })}>
      <Tab.Screen name="Home" component={SwipeableCard} options={{}} />
      <Tab.Screen name="Search" component={My} />
      <Tab.Screen name="Subscription" component={Payment} />

      {/* <Tab.Screen
        name="SwipeableCard"
        component={SwipeableCard}
        options={{title: 'Swipeable Card'}}
      /> */}
      <Tab.Screen name="myprofile">
        {props => (
          <StackNav
            {...props}
            user={user}
            setUser={setUser}
            profilePhoto={profilePhoto}
            setProfilePhoto={setProfilePhoto}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function DrawerNav() {
  return (
    <Drawer.Navigator drawerPosition="right">
      <Drawer.Screen
        name="Home"
        component={TabNav}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="My" component={My} />
      <Drawer.Screen name="Swiping" component={SwipingFeature} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNav />
      {/* <TabNav></TabNav> */}
    </NavigationContainer>
  );
};

const Login = () => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

const My = () => {
  return (
    <View>
      <Text>My</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containeri: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'grey',
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default App;
