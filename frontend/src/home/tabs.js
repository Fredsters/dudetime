import React, { Component } from "react";
import Mates from "../mates/index.js";
import Dudes from "../dudes/index";
import MyMates from "../mates/myIndex";
import MateModal from "../mates/MateEdit";
import { TabNavigator } from "react-navigation";
import { StackNavigator } from "react-navigation";
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label,
  Header,
  Left,
  Right,
  Title,
  Body
} from "native-base";



Tabs = TabNavigator(
  {
    Mates: {
      screen: Mates,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Dudes: {
      screen: Dudes,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    MyMates: {
      screen: MyMates,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
  },
  {
    tabBarPosition: "bottom"
  });

export default (DrawNav = StackNavigator({
  Tabs: {
    screen: Tabs
  },
  MateModal: {
    screen: MateModal,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>MateModal</Title>
          </Body>
          <Right />
        </Header>
      )
    })
  }
}));
