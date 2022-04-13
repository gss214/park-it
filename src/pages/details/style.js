import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerForm: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    width: "100%",
    height: "auto"
  },
  rowContanier: {
    flexDirection:'row'
  },
  text: {
    textAlign: 'center'
  },

  espaco: {
    width: "100%",
    fontSize: 18,
    paddingBottom: 15

  },
  starCount: {
    paddingTop: 15,
  },
  ratingView: {
    flexDirection:'row',
    paddingBottom: 15
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
    overflow:'hidden',
    borderRadius: 150/2,
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
  overviewContainer: {
    width: "100%",
    textAlign: "left",
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#e0e5e5',
    alignItems:'center'
  },
});

export default styles;