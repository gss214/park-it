import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e5e5',
    alignItems: 'center'
  },
  mapView: {
    width: "100%",
    height: 200,
    position: 'absolute',
    top: 0
  },
  overviewContainer: {
    width: "100%",
    textAlign: "left",
    paddingLeft: 20,
  },
  overviewItem: {
    width: "100%",
    fontSize: 16
  },
  parkingTitle: {
    fontSize: 24,
    fontWeight: '800',
    paddingBottom: 10
  },

  ratingView: {
    flexDirection: 'row'
  },
  rating: {
    paddingTop: 15,
    paddingRight: 10
  },
  barRating: {
    paddingTop: 10,
    paddingRight: 10
  },
  starCount: {
    paddingTop: 15,
  },
  isPrivate: {
    paddingTop: 5
  }
});

export default styles