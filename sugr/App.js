import * as Font from 'expo-font';
import * as firebase from 'firebase';

import { Container, StyleProvider, Text } from 'native-base';
import React, { Component } from 'react';

// import ApiKeys from './constants/ApiKeys';
import { AppLoading } from 'expo';
import AppNavigator from './AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import { createStore } from 'redux';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import rootReducer from './reducers/rootReducer.js';

const store = createStore(rootReducer);

export default class App extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         fontLoaded: false,
      };

   }

   async componentDidMount() {
      await Font.loadAsync({
         Roboto: require('native-base/Fonts/Roboto.ttf'),
         Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
         // Roboto: require('./assets/Roboto.ttf'),
         // Roboto_medium: require('./assets/Roboto_medium.ttf'),
         ...Ionicons.font,
      });
      this.setState({ fontLoaded: true });
   }

   render() {
      console.disableYellowBox = true;
      if (!this.state.fontLoaded) {
         return <AppLoading />;
      }

      return (
         <Root>
            
            <Provider store={store}>
               <StyleProvider style={getTheme(material)}>
               <AppNavigator />
               </StyleProvider>
            </Provider>
         </Root>
      );
   }
}

// export const firebaseApp = firebase.initializeApp(ApiKeys.firebaseConfig);
// export const firebaseDb = firebaseApp.database();
