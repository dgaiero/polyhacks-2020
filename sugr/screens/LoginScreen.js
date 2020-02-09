// import * as firebase from 'firebase';

import { Button, Container, Content, Input, Item, Text, View } from 'native-base';
// import { Col, Grid, Row } from 'react-native-easy-grid';
import { Dimensions, Image, StatusBar } from 'react-native';
import React, { Component } from 'react';

import { connect } from 'react-redux';
// import getTheme from './native-base-theme/components';
import { ids } from '../data';
// import material from './native-base-theme/variables/material';
import {setId} from '../actions/requestActions';

const labelStyle = {
   color: '#fff',
}

const win = Dimensions.get('window');
const logoWidth = win.width - 40;
const ratio = logoWidth / 1026; //541 is actual image width

class LoginScreen extends Component {

   constructor(props) {
      super(props);
      this.state = {
         username: ""
      };
  }

   updateID(username) {
      id = ids[username]
      this.props.setId(id);
      this.props.navigation.navigate('Landing');
   }

   render() {
      const { navigate } = this.props.navigation;
      const { username } = this.state;
      return (
         <Container style={{ backgroundColor: '#31393c' }}>
            {/* <StatusBar hidden={true} /> */}
            <Content contentContainerStyle={{
               paddingHorizontal: 10,
               flex: 1,
               justifyContent: 'center',
            }}>
               <View style={{ alignItems: 'center', }}>
                  <Image style={{
                     width: logoWidth,
                     height: 277 * ratio,
                  }} source={require('../assets/sugr-logo-login-08.png')} />
               </View>

               <Item floatingLabel>
                  <Input
                     placeholder="Username"
                     placeholderTextColor="#fff"
                     autoCompleteType="email"
                     keyboardType="email-address"
                     style={labelStyle}
                     onChangeText={(username) => this.setState({username})}/>
               </Item>
               <Item floatingLabel>
                  <Input
                     placeholder="Password"
                     secureTextEntry
                     placeholderTextColor="#fff"
                     autoCompleteType="password"
                     style={labelStyle} />
               </Item>
               <Button
                  light
                  block
                  onPress={() => this.updateID(username)}
                  style={{ marginTop: 40 }}>
                  <Text>Login</Text>
               </Button>
            </Content>
         </Container>
      );
   }
}

const mapDispatchToProps = {
   setId
}

export default connect(null,mapDispatchToProps)(LoginScreen);