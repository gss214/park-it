import { View } from 'react-native'
import stylesGeneral from './src/components/style'
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from './src/navigators/stackNavigation'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage'])

export default function App() {
  return (
    <View style={stylesGeneral.container}>
       <NavigationContainer>
         <MainStackNavigator />
      </NavigationContainer>
    </View>
  );
}
