import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e5e5',
    alignItems:'center'
  },
  mapView: {
    width: 600,
    height: 600,
    marginBottom: 90
  },
  search:{
    position: 'absolute',
    top: 20,
    left: 20,
    right: 100,
    bottom: 100,
    width: 350
  }
});

export default styles