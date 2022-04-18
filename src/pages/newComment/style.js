import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  rowContanier: {
    flexDirection: 'row'
  },
  inputContainer: {
    alignSelf: "center",
    width: "96%",
    marginLeft: 2,
    marginRight: 2,
    marginTop: 10,
    minHeight: 10,
    minWidth: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  barRating: {
    paddingTop: 10,
    paddingRight: 10,
    marginBottom: 20,
    marginTop: 10
  },
});

export default styles;