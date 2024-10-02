import Login from './screens/auth/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/auth/Register'
import { AuthProvider } from './context/authContext';
import Home from './screens/Home';
import StartingPage from './screens/StartingPage';
import MainPage from './screens/MainPage';
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import Help from './screens/Help';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Profile from './screens/Profile';


function App () {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();  // Hide splash screen after 5 seconds
    }, 5000);
  }, []);

const Stack = createNativeStackNavigator()
  return (
<NavigationContainer>

<AuthProvider>

<Stack.Navigator initialRouteName="StartingPage">
<Stack.Screen name="StartingPage" component={StartingPage} options={{headerShown:false}}/>
<Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
  <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
  <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
  <Stack.Screen name="MainPage" component={MainPage} options={{headerShown:false}}/>
  <Stack.Screen name="Help" component={Help} options={{headerShown:false}}/>
  <Stack.Screen name="ContactUs" component={ContactUs} options={{headerShown:false}}/>
  <Stack.Screen name="AboutUs" component={AboutUs} options={{headerShown:false}}/>

  <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>


</Stack.Navigator>

</AuthProvider>


</NavigationContainer>
  
  )
}

export default App