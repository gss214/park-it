import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "auto"
  },
  rowContanier: {
    flexDirection: 'row'
  },
  text: {
    textAlign: 'center'
  },
  photoContainer: {
    flex: 1,
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 150 / 2,
    shadowColor: 'black',
  },
  photoContainer: {
    flex: 1,
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e7e7',
    borderRadius: 2,
    width: 128,
    height: 128,
    elevation: 5,
    shadowColor: 'black',
  },
});

export default styles;