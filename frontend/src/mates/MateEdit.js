import React from "react";
import constants from '../helper/constants';
import DatePicker from 'react-native-datepicker'
import { AppRegistry, TextInput, View, StatusBar, ActivityIndicator, ListView, StyleSheet, TimePickerAndroid } from "react-native";
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
      let time = new Date(this.state.date + "T" + this.state.time);

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
        <Content padder>
          <Input type="text"
            placeholder="Title"
            style={{ borderBottomWidth: 1 }}
            onChangeText={
              (text) => this.setState({ title: text })
            } value={this.state.title}
          />
          <View style={{ flexDirection: 'row' }}>
            <DatePicker
              date={this.state.date}
              style={{ width: "50%" }}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              androidMode="default"
              iconComponent={<Icon name="calendar" />}
              customStyles={{
                dateInput: {
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                  borderWidth: 0,
                  borderBottomWidth: 1
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ date: date }) }}
            /><DatePicker
              style={{ width: "50%" }}
              date={this.state.time}
              mode="time"
              placeholder="select date"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              androidMode="spinner"
              iconComponent={<Icon name="clock" />}
              customStyles={{
                dateInput: {
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                  borderWidth: 0,
                  borderBottomWidth: 1
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(time) => { this.setState({ time: time }) }}
            />
          </View>
          {/* todo location in extra window with input on top and suggested list below */}
          <Input type="text" placeholder="Locations" onChange={
            (text) => this.setState({ location: text.nativeEvent.text })
          } value={this.state.location} />

          <TextInput type="text"
            placeholder="Descripton #first #second #third"
            // multiline={true}
            maxHeight={60}
            autoGrow={true}
            style={{ width: '100%' }}
            // numberOfLines={2}
            onChangeText={
              (text) => this.setState({ description: text })
            } value={this.state.description} />


          <TextInput
            placeholder="Next ddessdsd"
            multiline={true}
            onChange={(event) => {
              this.setState({
                text: event.nativeEvent.text
              });
            }}
            onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height })
            }}

            style={[{ height: Math.max(35, this.state.height) }]}
            value={this.state.text}
          />
          <Label>time</Label>
          <Input onChange={this.handleChangedTime("time")} value={this.state.time} />
          <Label>status</Label>
          <Input onChange={this.handleChangedStatus} value={this.state.status} />
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
