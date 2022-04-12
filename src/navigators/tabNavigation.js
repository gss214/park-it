import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { CreateParkingLot } from '../pages/createParkingLot'
import { Home } from '../pages/home'
import { Profile } from '../pages/profile'
import { Comments } from '../pages/comments'
import { Details } from '../pages/details'
import { Overview } from '../pages/overview'

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator style={{marginTop:30}}>
      <Tab.Screen name="Vagas" component={Home} />
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Novo Estacionamento" component={CreateParkingLot} />
      
    </Tab.Navigator>
  );
};

export {TopTabNavigator};