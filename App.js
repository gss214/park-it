import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import stylesGeneral from './src/components/style'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from './src/pages/login'
import { Register } from './src/pages/register'
import { Home } from './src/pages/home';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
  /*  <View style={styles.container}>
      <Text>Parkit</Text>
      <MapView style={{width: 400, height: 400}}
        initialRegion={{
          latitude: -15.88621292923914,
          longitude: -48.01274074440105,
          latitudeDelta: 0.92,
          longitudeDelta: 0.0421
        }}
      ></MapView>
    </View>*/
    <View style={stylesGeneral.container}>
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen 
             name="Login" 
             component={Login}
             options={{ headerShown: false }}
             />
           <Stack.Screen 
             name="Register" 
             options={{ headerShown: false }}
             component={Register}
           />
           <Stack.Screen 
             name="Home" 
             options={{ headerShown: false }}
             component={Home}
           />
         </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}


