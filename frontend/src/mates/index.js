import React, { Component } from "react";
import Mates from "./Mates.js";
import MateDetail from "./MateDetail";
import { StackNavigator } from "react-navigation";
import {
    Button,
    Header,
    Left,
    Right,
    Icon,
    Title,
    Body
} from "native-base";
export default (DrawNav = StackNavigator({
    Mates: {
        screen: Mates,
        navigationOptions: ({ navigation }) => ({
            headerMode: "float",
            header: (
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Mates</Title>
                    </Body>
                    <Right />
                </Header>
            )
        })
    },
    MateDetail: {
        screen: MateDetail,
        navigationOptions: ({ navigation }) => ({
            headerMode: "float",
            header: (
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>MateDetail</Title>
                    </Body>
                    <Right />
                </Header>
            )
        })
    }
}));
