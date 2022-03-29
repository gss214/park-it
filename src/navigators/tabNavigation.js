import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { CreateParkingLot } from '../pages/createParkingLot'
import { Home } from '../pages/home'
import { Profile } from '../pages/profile'

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator style={{marginTop:30}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="CreateParkingLot" component={CreateParkingLot} />
    </Tab.Navigator>
  );
};

export {TopTabNavigator};