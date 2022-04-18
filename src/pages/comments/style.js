import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "auto",
    backgroundColor: "#FFFFFF"
  },
  rowContanier: {
    flexDirection: 'row'
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    marginTop: 16,
    marginLeft: '2%',
    width: '95%',
    shadowColor: '#000',
    borderRadius: 30,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  barRating: {
    paddingTop: 10,
    paddingRight: 10
  },
  starCount: {
    paddingTop: 15,
  }
});

export default styles;