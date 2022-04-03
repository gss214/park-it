import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Comments } from '../pages/comments'
import { Details } from '../pages/details'
import { Overview } from '../pages/overview'

const Tab = createMaterialTopTabNavigator();

const TopTabNavigatorParking = ({route}) => {
  const parking = route.params
  console.log(parking)
  return (
    <Tab.Navigator style={{marginTop:30}}>
      <Tab.Screen name="Visão Geral" component={Overview} initialParams={parking} />
      <Tab.Screen name="Comentários" component={Comments} />
      <Tab.Screen name="Detalhes" component={Details} />
    </Tab.Navigator>
  );
};

export {TopTabNavigatorParking};