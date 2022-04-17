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
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginTop: 16,
    marginLeft: '2%',
    width: '100%',
    shadowColor: '#000',
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