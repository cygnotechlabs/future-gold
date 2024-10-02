import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RateAlert from './RateAlert';
import Spot from './Spot';
import Profile from './Profile';

// Create navigators
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Spot"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'RateAlert':
              iconName = 'alert-circle-outline';
              break;
            case 'Spot':
              iconName = 'server';
              break;
            case 'Profile':
              iconName = 'person-outline'; // Icon for Profile
              break;
            default:
              iconName = 'help-circle-outline';
              break;
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#5E422D', // Background color for the entire tab bar
        },
        tabBarActiveTintColor: 'white', // Color for active tab icon
        tabBarInactiveTintColor: '#999', // Color for inactive tab icons
        headerShown: false,
      })}
    >
      <Tab.Screen name="RateAlert" component={RateAlert} />
      <Tab.Screen name="Spot" component={Spot} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const MainPage = () => {
  return <TabNavigator />;
};

export default MainPage;
