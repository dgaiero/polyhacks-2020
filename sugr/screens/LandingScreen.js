import { Alert, RefreshControl } from 'react-native';
import { Body, Button, Container, Content, Footer, FooterTab, H1, H2, Header, Icon, Left, List, ListItem, Right, Text, Title } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { firebaseAuth, firebaseDb } from '../FirebaseHelper';

import ApiKeys from '../constants/ApiKeys';
import React from 'react';
import { connect } from 'react-redux';
import { removeRequest } from '../actions/requestActions';
import { withNavigation } from 'react-navigation';

class LandingScreen extends React.Component {

   static navigationOptions = {
      headerShown: false,
   };

   constructor(props) {
      super(props);
      this._confirmRequest = this._confirmRequest.bind(this);
      this._mapContent = this._mapContent.bind(this);
   }

   _removeRequest(i) {
      let reqs = [];
      var user = firebaseAuth.currentUser;

      if (user) {
         console.log("signed in");
         // User is signed in.
      } else {
         console.log("signing in");
         firebaseAuth.signInAnonymously();
         firebaseAuth.onAuthStateChanged();
      }

      firebaseDb.on('value', (snapshot) => {
         reqs = snapshot.val().requests;
      });

      reqs.splice(i, 1);
      firebaseDb.set({
         requests: reqs
      });
      this.props.removeRequest(i);
   }

   removeRequest(i) {
      this.props.removeRequest(i);
   }

   _confirmRequest(i) {
      Alert.alert(
         'Confirm Request',
         'Are you sure that you want to confirm this request? ',
         [
            {
               text: 'Cancel',
               onPress: () => console.log("cancel"),
               style: 'cancel',
            },
            { text: 'Confirm', onPress: () => this._removeRequest(i) },
         ],
      )
   }

   _mapContent() {
      let listView = [];
      //let reqs = this.props.req.requests;
      let reqs = [];

      var user = firebaseAuth.currentUser;

      if (user) {
         console.log("signed in");
         // User is signed in.
      } else {
         console.log("signing in");
         firebaseAuth.signInAnonymously();
         firebaseAuth.onAuthStateChanged();
      }

      firebaseDb.on('value', (snapshot) => {
         reqs = snapshot.val().requests;
      });

      console.log(reqs);

      /*
      var request = {
         item: "Egg",
         quantity: 4,
         isBorrowed: false,
         startTime: new Date(Date.now()),
         description: "Testing..."
      }
      reqs.push(request);*/
      console.log(reqs.length)
      for (let i = 0; i < reqs.length - 1; i++) {
         let name = reqs[i].name;
         let borrow = reqs[i].isBorrowed === "key1" ? "to borrow " : "for ";
         let plural = reqs[i].quantity == 1 ? "" : "s";
         let special = reqs[i].description === "" ? "" : "\nExtra Notes: " + reqs[i].description;
         let item = name + " is looking " + borrow + reqs[i].quantity + " " + reqs[i].item + plural + "." + special + "\n- Posted: " +
            reqs[i].startTime;
         listView.push(<ListItem key={i} onPress={() => this._confirmRequest(i)}><Text style={{ color: "#31393C" }} >{item}</Text></ListItem>);
      }

      if (listView.length == 0) {
         return (
            <Content contentContainerStyle={{
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
            }}>
               <H1 style={{ color: "#31393C", alignSelf: 'center' }}>Hello {this.props.req.user}!</H1>
               <H2 style={{ color: "#31393C", alignSelf: 'center' }}>There are no requests.</H2>
               <Button
                  light
                  style={{ marginTop: 40 }}
                  onPress={() => this.props.navigation.navigate('Request')}>
                  <Text>Add a request</Text>
               </Button>
            </Content>
         );
      }

      return (
         <Content>
            <List>
               {listView}
            </List>
         </Content>
      );

   }

   render() {
      const { navigate } = this.props.navigation;
      return (
         <Container style={{ backgroundColor: '#FFFFFF' }}>
            <Header style={{ backgroundColor: '#6D7BEA' }}>
               <Body>
                  <Title>{this.props.req.user} | Requests</Title>
               </Body>
               <Right>
                  <Button hasText transparent onPress={() => this.props.navigation.navigate('Request')}>
                     <Text>Add Request</Text>
                  </Button>
               </Right>
            </Header>
            {this._mapContent()}
         </Container>

      );
   }
}

const mapStateToProps = state => ({
   req: state.req,
});

const mapDispatchToProps = {
   removeRequest
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(LandingScreen));