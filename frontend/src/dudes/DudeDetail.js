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
import { StackNavigator } from "react-navigation";
export default class DudeDetail extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (
            <Container>
                <Content>
                    <Text>Dude Detail</Text>
                </Content>
            </Container >
        );
    }
}
