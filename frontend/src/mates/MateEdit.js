import React from "react";
import constants from '../helper/constants';
import DatePicker from 'react-native-datepicker'
import { AppRegistry, TextInput, View, StatusBar, ActivityIndicator, ListView, StyleSheet } from "react-native";
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
  Picker,
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

export default class MateEdit extends React.Component {

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
    this.state.time = "19:00";
    this.state.date = Date.now();
    this.loadUsers();
  };

  async loadUsers() {
    try {
      let response = await fetch(constants.BASE_URL + "/users");
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({
        isLoading: false,
        dataArray: responseJson,
        owner: responseJson[0],
        userIds: responseJson.map(user => user._id)
      }, function () {

        // do something with new state
      });
      return responseJson;
    }
    catch (error) {
      console.log("Something went wrong");
      console.error(error);
    }
  }

  async createNewMate() {
    console.log(this.state.description);
    console.log(this.state.location);
    try {
      let time = new Date(this.state.date + " " + this.state.time);

      let response = await fetch(constants.BASE_URL + "/mate", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: this.state.description,
          status: this.state.status,
          activity: this.state.activity,
          location: this.state.location,
          ownerId: this.state.owner._id,
          receivers: this.state.userIds,
          time: time
        })
      });

      console.log(response);
      return response;
    }
    catch (error) {
      console.log("Something went wrong");
      console.error(error);
    }
  };

  handleChange(evt) {
    this.setState({ activity: evt.target.value });
  };

  handleChangedTime(fieldName) {
    return (event) => {
      this.setState({
        [fieldName]: event.nativeEvent.text,
      })
    }
  };

  handleChangedStatus(a, b, c, d) {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content style={styles.content} padder>
          <TextInput type="text"
            placeholder="Title"
            // underlineColorAndroid='rgba(0,0,0,0)'
            style={[styles.input]}
            onChangeText={
              (text) => this.setState({ title: text })
            } value={this.state.title}
          />
          <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
            <DatePicker
              style={[styles.datePicker, { width: "48%" }]}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="ddd, DD. MMM YY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              androidMode="default"
              // iconComponent={<Icon style={{color: '#fff'}} name="calendar" />}
              customStyles={{
                dateInput: {
                  backgroundColor: "#5cb85c",
                  borderWidth: 0
                },
                placeholderText: {
                  fontSize: 20,
                  color: "white"
                },
                dateText: {
                  fontSize: 20,
                  color: "white"
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ date: date }) }}
            />
            <DatePicker
              style={[styles.datePicker, { width: "48%", backgroundColor: "#5cb85c" }]}
              date={this.state.time}
              mode="time"
              placeholder="select time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              androidMode="spinner"
              iconComponent={<Icon style={{ color: '#fff', paddingRight: 10 }} name="time" />}
              customStyles={{
                dateInput: {
                  backgroundColor: "#5cb85c",
                  borderWidth: 0
                },
                placeholderText: {
                  fontSize: 20,
                  color: "white"
                },
                dateText: {
                  fontSize: 20,
                  color: "white"
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(time) => { this.setState({ time: time }) }}
            />
          </View>
          {/* todo location in extra window with input on top and suggested list below */}
          <Input
            type="text"
            placeholder="Locations"
            style={styles.input}
            onChange={(text) => this.setState({ location: text.nativeEvent.text })}
            value={this.state.location} />
          <Input
            placeholder="Description #firstTag #secondTag"
            multiline={true}
            onChange={(event) => {
              this.setState({
                text: event.nativeEvent.text
              });
            }}
            onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height })
            }}
            style={[styles.growInput, { height: Math.max(35, this.state.height) }]}
            value={this.state.text}
          />
          <Picker mode="dropdown">
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="Kilo" value="Kilo" />
            <Picker.Item label="Peter" value="Peter" />
          </Picker>

          <Button dark
            onPress={this.createNewMate.bind(this)}
          >
            <Text>Create Mate</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    lineHeight: 20,
    height: 50,
    color: 'white',
    paddingLeft: 5,
    paddingRight: 5
  },
  growInput: {
    borderWidth: 1,
  },
  content: {
    backgroundColor: 'black'
  },
  datePicker: {
    borderBottomWidth: 0
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 10
  }
});
