import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
   Login: {
      screen: LoginScreen,
      navigationOptions: {
         headerShown: false,
      }},
   Landing: {
      screen: LandingScreen,
      navigationOptions: {
         headerShown: false,
      }
   },
});

export default createAppContainer(MainNavigator);
