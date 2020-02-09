import * as Font from 'expo-font';
import * as firebase from 'firebase';

import React, { Component } from 'react';

import ApiKeys from './constants/ApiKeys';
import { AppLoading } from 'expo';
import AppNavigator from './AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer.js';

const store = createStore(rootReducer);

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isReady: false,
      };

      // Initialize Firebase
      if (!firebase.apps.length) {firebase.initializeApp(ApiKeys.firebaseConfig); }
   }

   async componentDidMount() {
      await Font.loadAsync({
         Roboto: require('native-base/Fonts/Roboto.ttf'),
         Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
         ...Ionicons.font,
      });
      this.setState({ isReady: true });
   }

   render() {
      if (!this.state.isReady) {
         return (
            <Root>
               <AppLoading />
            </Root>
         );
      }

      return (
         <Root>
            <Provider store={store}>
               <AppNavigator />
            </Provider>
         </Root>
      );
   }
}
