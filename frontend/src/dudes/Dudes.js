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
export default class Dudes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //   isLoading: true
    };
  }

  componentDidMount() {
    console.log("ComponentDidMount");
    // this.loadMates();
  };

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={{ flex: 1, paddingTop: 20 }}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }

    return (
      <Container>
        <Content>
          {/* <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData.description}, {rowData.createTime}</Text>}
          />
          <List style={{ backgroundColor: 'white' }} dataArray={this.state.dataArray}
            renderRow={(item) =>
              <ListItem>
                <Text>{item.description}</Text>
              </ListItem>
            }>
          </List>
          <List style={{ backgroundColor: 'red' }} dataArray={this.state.dataArray}
            renderRow={(item) =>
              <Text>{item.description}</Text>
            }>
          </List> */}
          <Button title="Learn More"
            onPress={() => this.props.navigation.navigate("MateEdit")}
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