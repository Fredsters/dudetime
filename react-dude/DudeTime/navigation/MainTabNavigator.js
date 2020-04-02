import React from 'react';
import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from "react-navigation-stack"

import CreateMate from '../screens/CreateMate';
import TabView from '../components/TabView';
import Profile from '../screens/Profile';
import MateList from '../screens/MateList';
import MateTabView from '../screens/MateTabView';

const NavStack = createStackNavigator({
    Mates: MateTabView,
    CreateMates: CreateMate,
    Profile: Profile
});
/*
MateStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};*/
export default NavStack ;
/*createMaterialTopTabNavigator ({
    MateStack,
    ProfileStack,
    CreateMateStack
});*/
