import { Button, Container, Content, Form, Header, Input, Item, Label, Text, View } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Dimensions, Image, StatusBar } from 'react-native';
import React, { Component } from 'react';

const labelStyle = {
   color: '#fff',
}

const win = Dimensions.get('window');
const logoWidth = win.width - 40;
const ratio = logoWidth / 2134; //541 is actual image width

export default class LoginScreen extends Component {


   render() {
      const { navigate } = this.props.navigation;
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
                     height: 578 * ratio,
                  }} source={require('../assets/sugr-logo-1024.png')} />
               </View>

               <Item floatingLabel>
                  <Input
                     placeholder="Username"
                     placeholderTextColor="#fff"
                     autoCompleteType="email"
                     keyboardType="email-address"
                     style={labelStyle}/>
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
                  onPress={() => navigate('Landing')}
                  style={{ marginTop: 40 }}>
                  <Text>Login</Text>
               </Button>
            </Content>
         </Container>
      );
   }
}