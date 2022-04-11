import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e5e5',
    alignItems:'center'
  },
  mapView: {
    top: 90,
    width: 600,
    height: 550,
    position: 'absolute'
  },
  button1: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#6FD34B',
    color: '#FFFFFF',
    borderRadius: 50,
    padding: 10,
    marginBottom: 15,
    top: 650,
    left: 10,
    width: 150,
    height: 50,
    alignItems: "center",
  }, 

  button2: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#6FD34B',
    color: '#FFFFFF',
    borderRadius: 50,
    padding: 10,
    top: 650,
    left: 200,
    width: 150,
    height: 50,
    marginBottom: 15,
    alignItems: "center",
  }, 

  voltar: {
    width: 40,
    height: 40,
  },

  buttonVoltar: {
    ...StyleSheet.absoluteFill,
    borderRadius: 50,
    padding: 10,
    marginBottom: 15,
    top: 30,
    left: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: 'center',
  }
});

export default styles