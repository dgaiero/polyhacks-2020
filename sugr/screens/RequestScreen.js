import { Body, Button, Container, Content, H1, Header, List, ListItem, Text, Title } from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';

import  Footer from '../Footer.js'
import React from 'react';
import {connect} from 'react-redux';

class LandingScreen extends React.Component {

   static navigationOptions = {
      headerShown: false,
   };

   constructor(props) {
    super(props);
    this.state = {
       item: ""
    };
 }

   render() {
      const { item } = this.mapStateToProps;
      return (
         <Container>
            <Content>
                <View>
                    <Text>Item</Text>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Type here to translate!"
                        onChangeText={(text) => this.setState({item})}
                        value={this.state.item}
                    />
                </View>
                <View>
                    <Text>Quantity</Text>
                </View>
                <View>
                    <Text>Borrow or Keep</Text>
                </View>
                <View>
                    <Text>Extra Notes</Text>
                </View>
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