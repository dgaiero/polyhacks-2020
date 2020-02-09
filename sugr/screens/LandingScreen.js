import { Body, Button, Container, Content, H1, Header, List, ListItem, Text, Title } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';

import  Footer from '../Footer.js'
import React from 'react';
import {connect} from 'react-redux';

class LandingScreen extends React.Component {

   static navigationOptions = {
      headerShown: false,
   };

   _mapContent() {

      let listView = [];
      let reqs = this.props.req.requests;
      var request = {
         item: "Egg",
         quantity: 4,
         isBorrowed: false,
         startTime: new Date("2/8/2020"),
         endTime: new Date("2/9/2020"),
         description: "Testing..."
      }
      reqs.push(request);
      for (let i = 0; i < reqs.length; i++) {
         let borrow = reqs[i].isBorrowed ? "borrow " : "";
         let plural = reqs[i].quantity == 1 ? "" : "s";
         let special = reqs[i].description == "" ? "" : "\nExtra Notes: " + reqs[i].description;
         let item = "Seeking: " + borrow + reqs[i].quantity + " " + reqs[i].item + plural + ", from: " + 
            reqs[i].startTime.toLocaleDateString() + " to " + reqs[i].endTime.toLocaleDateString() + "." +
            special;
         listView.push(<ListItem key={i}><Text>{item}</Text></ListItem>);
      }

      if (listView.length == 0) {
         return <H1>No Requests</H1>
      }

      return (
            <List>
               {listView}
            </List>
      ); 

   }

   render() {
      const { navigate } = this.props.navigation;
      return (
         <Container>
            <Content>
               {this._mapContent()}
            </Content>
            <Footer />
         </Container>
         
      );
   }
}

const mapStateToProps = state => ({
   req: state.req,
});

export default connect(mapStateToProps)(LandingScreen);