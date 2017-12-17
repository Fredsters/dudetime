import React from "react";
import constants from '../helper/constants';
import { AppRegistry, View, StatusBar, ActivityIndicator, ListView, StyleSheet, Image, Dimensions } from "react-native";
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

export default class MateDetail extends React.Component {

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
    // Image.getSize('../../resources/images/tf.png', (width, height) => {
    //   // calculate image width and height 
    //   
    //   const scaleFactor = width / screenWidth
    //   const imageHeight = height / scaleFactor
    //   this.setState({ imgWidth: screenWidth, imgHeight: imageHeight })
    // });
  }

  render() {
    // const { params } = this.props.navigation.state.params;
    // const { imgWidth, imgHeight } = this.state
    console.log(this.props.navigation.state.params);
    var penis = this.props.navigation.state.params.penis;
    const screenWidth = Dimensions.get('window').width;

    console.log(penis.description);
    return (
      <Container>
        <Content padder style={styles.content}>
          <View style={[styles.center, styles.bottomBorder]}>
            <Button rounded success style={[styles.center, { height: 60, width: '60%' }]}>
              <Text style={{ fontSize: 15 }}>Let's Do This</Text>
            </Button>
          </View>
          <View style={[{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }]}>
            <Image
              source={require('../../resources/images/tf.png')}
              style={{ width: 80, height: 80, borderRadius: 40 }} />
            <View style={{ paddingLeft: 10 }}>
              <Text>
                <Text style={[styles.white, { fontSize: 30 }]}>{penis.description}</Text>
              </Text>
              <Text style={styles.white}>
                Status
              </Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#5cb85c', flexDirection: 'row', padding: 5 }}>
            <Text style={{ borderRightWidth: 2, borderRightColor: 'black', paddingRight: 5 }}>{penis.time.toString()}</Text>
            <Text style={{ borderRightWidth: 2, paddingLeft: 5, paddingRight: 5 }}>{penis.location}</Text>
            <Text style={{ paddingLeft: 5 }}>{penis.activity} activity</Text>
          </View>
          {/* <Image
            resizeMode="cover"
            resizeMethod="scale"
            source={require('../../resources/images/tf.png')}
            style={{ width: null, height: screenWidth }} /> */}


          <Text style={styles.white}>#Jo</Text>
          <Text style={styles.white}>#Suite</Text>
          <Text style={styles.white}>#Nudeln</Text>
          <Text style={styles.white}>#Billard</Text>
          <Text style={styles.white}>#Trinke</Text>
          <Text>{penis.status}</Text>
        </Content>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'black'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  white: {
    color: 'white'
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 10
  }
});
