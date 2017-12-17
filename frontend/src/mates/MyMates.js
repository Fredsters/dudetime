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
  Input,
  InputGroup,
  Item,
  Tab,
  Tabs,
  Footer,
  FooterTab,
  List,
  ListItem,
  Thumbnail
} from "native-base";
export default class MyMates extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    console.log("ComponentDidMount");
    this.loadMates();
  };

  async loadMates() {
    try {
      let response = await fetch(constants.BASE_URL + "/mates");
      let responseJson = await response.json();
      let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      console.log(responseJson);
      console.log("JAJAJ");
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson),
        dataArray: responseJson
      }, function () {
        console.log("FuCk her Tight in the adwad");
        // do something with new state
      });
      return responseJson.movies;
    }
    catch (error) {
      console.log("Something went wrong");
      console.error(error);
    }
  }

  onNavToAddMate() {
    this.props.navigation.navigate("MateDetail");
  }

  // return fetch(constants.BASE_URL + "/mates")
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log("Fetch!!!");
  //     let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  //     this.setState({
  //       isLoading: false,
  //       dataSource: ds.cloneWithRows(responseJson),
  //     }, function () {
  //       console.log("FuCk her Tight in the suwwsy");
  //       // do something with new state
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("Something went wrong");
  //     console.error(error);
  //   });


  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Container>
        <Content>
          <List style={{ backgroundColor: 'white' }} dataArray={this.state.dataArray}
            renderRow={(item) =>
              <ListItem>
                <Text>{item.description}</Text>
              </ListItem>
            }>
          </List>
          <Button title="Learn More"
            onPress={() => this.props.navigation.navigate("MateModal")}
            color="#841584"
            style={styles.addButton} >
            <Icon name="add" />
          </Button>
        </Content>
      </Container >
    );
  }
}
const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: '10%',
    top: '50%',
    borderRadius: 1000
  }
});