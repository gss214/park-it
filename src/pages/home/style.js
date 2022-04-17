import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e5e5',
    alignItems: 'center'
  },
  mapView: {
    width: '100%',
    height: 900,
    marginBottom: 90
  },
  search: {
    position: 'absolute',
    top: 20,
    bottom: 100,
    width: '90%',
    alignSelf: 'center'
  }
});

export default styles