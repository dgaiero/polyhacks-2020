import { DrawerNavigator } from "react-navigation";
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import RequestScreen from './screens/RequestScreen'
import SideBar from "./Sidebar.js";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// const MainNavigator = DrawerNavigator({
//    Login: {
//       screen: LoginScreen,
//       navigationOptions: {
//          headerShown: false,
//       }
//    },
//    Landing: {
//       screen: LandingScreen,
//       navigationOptions: {
//          headerShown: false,
//       }
//    },
//    Request: {
//       screen: RequestScreen,
//       navigationOptions: {
//          headerShown: false,
//       }
//    },
// },
// {
//       contentComponent: props => <SideBar {...props} />
//   });

const MainNavigator = createStackNavigator({
   Login: {
      screen: LoginScreen,
      navigationOptions: {
         headerShown: false,
      }
   },
   Landing: {
      screen: LandingScreen,
      navigationOptions: {
         headerShown: false,
      }
   },
   Request: {
      screen: RequestScreen,
      navigationOptions: {
         headerShown: false,
      }
   },
});

export default createAppContainer(MainNavigator);
// export default MainNavigator;
