import React, { Component } from "react";
import Dudes from "./Dudes";
import DudeDetail from "./DudeDetail";
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
    Dudes: {
        screen: Dudes,
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
                        <Title>Dudes</Title>
                    </Body>
                    <Right />
                </Header>
            )
        })
    },
    DudeDetail: {
        screen: DudeDetail,
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
                        <Title>DudeDetail</Title>
                    </Body>
                    <Right />
                </Header>
            )
        })
    }
}));
