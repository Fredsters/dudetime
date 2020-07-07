import React from 'react';
import { Platform } from 'react-native';
import { styleConstants } from '../Style';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from "react-navigation-stack"
import Colors from '../constants/Colors';
import DudeHeader from '../components/DudeHeader';
import CreateMate from '../screens/CreateMate';
import Profile from '../screens/Profile';
import NewMates from '../screens/NewMates';
import AcceptedMates from '../screens/AcceptedMates';

const TabNavigator = createMaterialTopTabNavigator({
    NewMates: NewMates,
    AcceptedMates: AcceptedMates
  }, {
      backBehavior: "initialRoute",
      tabBarOptions: {
          activeTintColor: Colors.green,
          inactiveTintColor: Colors.white,
          upperCaseLabel: false,
          style: {
            backgroundColor: Colors.grey,
            borderBottomColor: Colors.green,
            borderBottomWidth: 1
          },
          labelStyle: {
            fontSize: styleConstants.fontMedium
          },
          indicatorStyle: {
              backgroundColor: Colors.green
          }
      }
  });

const NavStack = createStackNavigator({
    Mates: { 
        screen:TabNavigator,
        navigationOptions: ({ navigation }) => {
            return {
                headerStyle: {
                    backgroundColor: Colors.grey,
                    shadowColor: 'transparent'
                },
                headerTintColor: Colors.green,
                headerTitle: ()=> <DudeHeader navigation={navigation}/>
              };
          }
    },
    CreateMate: CreateMate,
    Profile: Profile
});

export default NavStack;
