import { Button, Footer, FooterTab, Text } from 'native-base';
import React, { Component } from 'react';

// import { withNavigation } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';

class MFooter extends Component {
   render() {
      // const {navigate} = this.props.navigation();
      return (
      <Footer>
            <FooterTab style={{ backgroundColor: "#31393C", color: "#fff" }}>
               <Button onClick={() => this.props.navigation.navigate('Landing')}>
                  <Text>Home</Text>
            </Button>
               <Button onClick={() => this.props.navigation.navigate('Request')}>
                  <Text>Request</Text>
            </Button>
         </FooterTab>
      </Footer>
      );
   }
}

export default withNavigation(MFooter);