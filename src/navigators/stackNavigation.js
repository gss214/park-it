import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { TopTabNavigator } from "../navigators/tabNavigation"
import { TopTabNavigatorParking } from "./tabNavigationParking"

import { SearchParkSpot } from '../pages/searchParkSpot'
import { Login } from '../pages/login'
import { Register } from '../pages/register'

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TopTabNavigator" 
        component={TopTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen 
        name="Register" 
        options={{ headerShown: false }}
        component={Register}
      />
      <Stack.Screen 
        name="TopTabNavigatorParking" 
        component={TopTabNavigatorParking}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SearchParkSpot" 
        options={{ headerShown: false }}
        component={SearchParkSpot}
      />
    </Stack.Navigator>
  );
}

export { MainStackNavigator }