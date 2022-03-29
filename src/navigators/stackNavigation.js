import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { TopTabNavigator } from "../navigators/tabNavigation"

import { Login } from '../pages/login'
import { Register } from '../pages/register'
import { Home } from '../pages/home'

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        options={{ headerShown: false }}
        component={Login}
        />
      <Stack.Screen 
        name="Home" 
        component={TopTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        options={{ headerShown: false }}
        component={Register}
      />
    </Stack.Navigator>
  );
}

export { MainStackNavigator }