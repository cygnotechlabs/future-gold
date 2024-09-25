import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';


import More from './android/app/src/Components/Screens/More';
import RateAlert from './android/app/src/Components/Screens/RateAlert';
import Spot from './android/app/src/Components/Screens/Spot';
import About from './android/app/src/Components/Screens/About';
import Contact from './android/app/src/Components/Screens/Contact';
import Help from './android/app/src/Components/Screens/Help';
// import OTP from './android/app/src/Components/Screens/OTP';
import GetStarted from './android/app/src/Components/Screens/GetStarted';
import Register from './android/app/src/Components/Registeration/Register';
import Login from './android/app/src/Components/Registeration/Login';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
            case 'More':
              iconName = 'reorder-four-outline';
              break;
            case 'Contact':
              iconName = 'headset-outline';
              break;
            case 'Help':
              iconName = 'help-circle-outline';
              break;
            default:
              iconName = 'help-circle-outline';
              break;
          }

          return <Ionicons name={iconName} size={30} color={color} />;
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
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

// Main App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName='Getstart'>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Getstart" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        {/* <Stack.Screen name="Otp" component={OTP} /> */}
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
