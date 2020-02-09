import { Button, Container, Content, Footer, FooterTab, Header, Text } from 'native-base';
import React, { Component } from 'react';
export default class FooterTabsExample extends Component {
   render() {
      return (
      <Footer>
         <FooterTab>
            <Button>
               <Text>Apps</Text>
            </Button>
            <Button>
               <Text>Camera</Text>
            </Button>
            <Button active>
               <Text>Navigate</Text>
            </Button>
            <Button>
               <Text>Contact</Text>
            </Button>
         </FooterTab>
      </Footer>
      );
   }
}