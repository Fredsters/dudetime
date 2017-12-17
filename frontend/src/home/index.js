import React, { Component } from "react";
import Contacts from "../contacts/Contacts";
import TabNav from "./tabs";
import Profile from "../profile/index.js";
import SideBar from "../sideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: TabNav },
    Contacts: { screen: Contacts },
    Profile: { screen: Profile }
  },
  {
    // contentComponent: props => <SideBar {...props} />,
    drawerPosition: "right"
  }
);
export default HomeScreenRouter;