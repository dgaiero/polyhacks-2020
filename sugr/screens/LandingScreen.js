import { Body, Button, Container, Content, Footer, FooterTab, H1, Header, Icon, Left, List, ListItem, Right, Text, Title } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { firebaseAuth, firebaseDb } from '../FirebaseHelper';

import { Alert } from 'react-native';
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
         let borrow = reqs[i].isBorrowed ? "borrow " : "";
         let plural = reqs[i].quantity == 1 ? "" : "s";
         let special = reqs[i].description === "" ? "" : "\nExtra Notes: " + reqs[i].description;
         let item = "Seeking: " + borrow + reqs[i].quantity + " " + reqs[i].item + plural + ", Posted: " +
            reqs[i].startTime + "." + special;
         listView.push(<ListItem key={i} onPress={() => this._confirmRequest(i)}><Text style={{ color: "#ffffff" }} >{item}</Text></ListItem>);
      }

      if (listView.length == 0) {
         return (
            <Content contentContainerStyle={{
               flex: 1,
               justifyContent: 'center',
               alignContent: 'center',
               alignItems: 'center'
            }}>
               <H1 style={{ color: "#fff" }}>No Requests</H1>
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

   _test() {
      console.log("in test");
      return (<H1>Test</H1>)
   }

   render() {
      const { navigate } = this.props.navigation;
      return (
         <Container style={{ backgroundColor: '#31393c' }}>
            <Header style={{ backgroundColor: '#2176FF' }}>
               <Body>
                  <Title>Requests</Title>
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