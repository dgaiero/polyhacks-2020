// import * as firebase from 'firebase';

import { Body, Button, Container, Content, Footer, FooterTab, Form, H1, Header, Icon, Input, Item, Label, Left, List, ListItem, Picker, Right, Text, TextInput, Title, View } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { firebaseAuth, firebaseDb } from '../FirebaseHelper';

import { Alert } from 'react-native';
import React from 'react';
import { addRequest } from '../actions/requestActions';
import { connect } from 'react-redux';

const labelStyle = {
   color: '#31393C',
}

class RequestScreen extends React.Component {

   static navigationOptions = {
      headerShown: false,
   };

   constructor(props) {
      super(props);
      this.state = {
         name: "",
         item: "",
         quantity: 0,
         borrow: "",
         desc: "",
         startTime: new Date(Date.now()).toLocaleDateString()
      };
      this._confirmRequest = this._confirmRequest.bind(this);
      this.storeRequest = this.storeRequest.bind(this);
   }

   onValueChange(value) {
      this.setState({
         borrow: value,
         startTime: new Date(Date.now()).toLocaleDateString()
      });
   }

   storeRequest() {
      let reqs = []
      var user = firebaseAuth.currentUser;

      if (user) {
         console.log("storerequest: signed in");
         // User is signed in.
      } else {
         console.log("storerequest: not signed in")
         firebaseAuth.signInAnonymously();
         firebaseAuth.onAuthStateChanged();
      }
      firebaseDb.on('value', (snapshot) => {
         reqs = snapshot.val().requests;
      });
      var req = {
         name: this.props.req.user,
         item: this.state.item,
         quantity: this.state.quantity,
         isBorrowed: this.state.borrow,
         startTime: this.state.startTime,
         description: this.state.desc
      }
      console.log("request screen1: " + reqs);

      reqs.unshift(req);

      console.log("request screen2: " + reqs);

      firebaseDb.set({
         requests: reqs
      });

      firebaseDb.on('value', (snapshot) => {
         reqs = snapshot.val().requests;
      });

      console.log("request screen3: " + reqs);
      this.props.addRequest(this.state.item, this.state.quantity, this.state.borrow, this.state.startTime, this.state.desc);

      this.props.navigation.navigate('Landing');
   }

   _confirmRequest() {
      this.props.addRequest(this.state.item, this.state.quantity, this.state.borrow, this.state.startTime, this.state.desc);
      this.props.navigation.navigate('Landing');
   }

   render() {
      const { push } = this.props.navigation;
      const { item, quantity, borrow, desc } = this.state;
      return (
         <Container style={{
            backgroundColor: '#fff'
         }}>
            <Header style={{ backgroundColor: '#6D7BEA' }}>
               <Body>
                  <Title>Add Request</Title>
               </Body>
               <Right>
                  <Button hasText transparent onPress={() => this.props.navigation.navigate('Landing')}>
                     <Text>View Requests</Text>
                  </Button>
               </Right>
            </Header>
            <Container style={{
               paddingHorizontal: 10,
               flex: 1,
               justifyContent: 'center',
            }}>
               <Content>
                  <Item fixedLabel >
                     <Label>Item</Label>
                     <Input onChangeText={(item) => this.setState({ item })} />
                  </Item>
                  <Item fixedLabel >
                     <Label>Quantity</Label>
                     <Input keyboardType="numeric" onChangeText={(quantity) => this.setState({ quantity })} />
                  </Item>
                  <Item fixedLabel >
                     <Label>Keep or Borrow</Label>
                     <Picker
                        note
                        mode="dropdown"
                        style={{ width: 120 }}
                        selectedValue={this.state.borrow}
                        onValueChange={this.onValueChange.bind(this)}
                     >
                        <Picker.Item label="Keep" value="key0" />
                        <Picker.Item label="Borrow" value="key1" />
                     </Picker>
                  </Item>
                  <Item fixedLabel>
                     <Label>More Notes</Label>
                     <Input onChangeText={(desc) => this.setState({ desc })} />
                  </Item>
                  <Button block onPress={() => this.storeRequest()}>
                     <Text>Submit</Text>
                  </Button>
               </Content>
            </Container>
            {/* <Footer>
                 <FooterTab style={{ backgroundColor: "#31393C", color: "#fff" }}>
                    <Button onClick={() => push('Landing')}>
                       <Text  style={{fontFamily: 'monospace'}}>Home</Text>
                    </Button>
                    <Button onClick={() => push('Request')}>
                       <Text  style={{fontFamily: 'monospace'}}>Request</Text>
                    </Button>
                 </FooterTab>
              </Footer> */}
         </Container>
      );
   }
}

const mapStateToProps = state => ({
   req: state.req,
});

const mapDispatchToProps = {
   addRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);