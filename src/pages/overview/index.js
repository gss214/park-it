import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import stylesGeneral from "../../components/style"
import styles from "./style"
import MapView, { Marker } from 'react-native-maps'
import { Rating } from 'react-native-ratings'

export const Overview = (props) => {
  const latitudeDelta = 0.002
  const longitudeDelta = 0.002

  function getFormattedData() {
    const parkingName = props.route.params.parking.name
    const starCount = props.route.params.parking.ratingTotalStars;
    const avaliationCount = props.route.params.parking.ratingUsers;
    var avaliation = 0
    if (avaliationCount != 0)
      avaliation = starCount / avaliationCount

    const isPrivate = props.route.params.parking.isPrivate ? "Estacionamento Privado" : "Estacionamento Público"
    var address = props.route.params.parking.address

    return {
      'parkingName': parkingName,
      'address': address,
      'avaliation': avaliation,
      'starCount': avaliationCount,
      'isPrivate': isPrivate,
    }
  }

  return (
    <View style={stylesGeneral.container}>
      <MapView
        style={styles.mapView}
        initialRegion={({
          latitude: props.route.params.parking.coordinates.latitude,
          longitude: props.route.params.parking.coordinates.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        })}
        loadingEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: props.route.params.parking.coordinates.latitude,
            longitude: props.route.params.parking.coordinates.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
          }}
          title={props.route.params.parking.name}
          image={require('../../../assets/app_logo.png')}
        >
        </Marker>
      </MapView>
      <TouchableOpacity style={stylesGeneral.button}>
        <Text 
          style={stylesGeneral.textButton}
          onPress={() => props.navigation.navigate("SearchParkSpot", props.route.params.parking)}>
          Procurar Vaga
        </Text>
      </TouchableOpacity>
      <View style={styles.overviewContainer}>
        <Text style={styles.parkingTitle}>{getFormattedData().parkingName}</Text>
        <Text style={styles.overviewItem}>{getFormattedData().address}</Text>
        <View style={styles.ratingView}>
          <Text style={styles.rating}>{getFormattedData().avaliation.toFixed(2)}</Text>
          <Rating
            style={styles.barRating}
            type='star'
            ratingCount={5}
            startingValue={getFormattedData().avaliation}
            imageSize={30}
            readonly={true} />
          <Text style={styles.starCount}>({getFormattedData().starCount} avaliações)</Text>
        </View>

        <Text style={styles.isPrivate}>{getFormattedData().isPrivate}</Text>

      </View>
    </View>
  );
}
