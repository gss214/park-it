import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -180,
    width: "100%",
    height: "auto",
    backgroundColor: "#FFFFFF"
  },
  photo: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 150 / 2,
    shadowColor: 'black',
    marginRight: 10,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: "#FFFFFF"
  },
  rowContanier: {
    flexDirection: 'row',
    marginLeft: 60,
    marginTop: 20,
  },
});

export default styles;