import React from 'react';
import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from "react-navigation-stack"

import TabBarIcon from '../components/TabBarIcon';
import CreateMate from '../screens/CreateMate';
import MateList from '../screens/MateList';
import Profile from '../screens/Profile';

const CreateMateStack = createStackNavigator({
    CreateMates: CreateMate,
});

CreateMateStack.navigationOptions = {
    tabBarLabel: 'Create Mates',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};

const MateStack = createStackNavigator({
    Mates: MateList,
});

MateStack.navigationOptions = {
    tabBarLabel: 'Mates',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};

const ProfileStack = createStackNavigator({
    Profile: Profile,
});

ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};

export default createMaterialTopTabNavigator ({
    MateStack,
    ProfileStack,
    CreateMateStack
});
