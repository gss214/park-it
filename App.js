import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Parkit</Text>
      <MapView style={{width: 400, height: 400}}
        initialRegion={{
          latitude: -15.88621292923914,
          longitude: -48.01274074440105,
          latitudeDelta: 0.92,
          longitudeDelta: 0.0421
        }}
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
