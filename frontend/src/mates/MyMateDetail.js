import React from "react";
import constants from '../helper/constants';
import { AppRegistry, View, StatusBar, ActivityIndicator, ListView, StyleSheet } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  InputGroup,
  Item,
  Tab,
  Tabs,
  Footer,
  FooterTab,
  List,
  Label,
  Input,
  Form,
  ListItem,
  Thumbnail
} from "native-base";

export default class MyMateDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: "",
      location: "",
      activity: "",
      time: "",
      status: "",
      owner: "",
      receivers: "",
      participants: ""
    }
  }

  componentDidMount() {
    console.log("Component Did Mount Mate Detail");
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content padder>
          <Text>My Mate Detail</Text>
        </Content>
      </Container>
    );
  }
}
