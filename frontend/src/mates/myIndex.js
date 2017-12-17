import React, { Component } from "react";
import MyMates from "./MyMates.js";
import MyMateDetail from "./MyMateDetail";
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
    MyMates: {
        screen: MyMates,
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
                        <Title>My Mates</Title>
                    </Body>
                    <Right />
                </Header>
            )
        })
    },
    MyMateDetail: {
        screen: MyMateDetail,
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
                        <Title>MyMateDetail</Title>
                    </Body>
                    <Right />
                </Header>
            )
        })
    }
}));
