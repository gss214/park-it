import React from "react"
import {View, Text, Image, TouchableOpacity} from "react-native"
import stylesGeneral from "../../components/style"
import styles from "./style"
import MapView, { Marker } from 'react-native-maps'

export const Overview = (props) => {
  const latitudeDelta = 0.002
  const longitudeDelta = 0.002

  return(
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
          ></Marker>
      </MapView>
      <TouchableOpacity style={stylesGeneral.button}>
        <Text 
          style={stylesGeneral.textButton}
          onPress={() => props.navigation.navigate("SearchParkSpot", props.route.params.parking)}>
          Procurar Vaga
        </Text>
      </TouchableOpacity>
      <Text style={{alignSelf:'center'}}>Nome do Estacionamento: {props.route.params.parking.name} </Text>
      <Text style={{alignSelf:'center'}}>Média de avaliações:</Text>
      <Text style={{alignSelf:'center'}}>Privado: </Text>
      <Text style={{alignSelf:'center'}}>Ponto de referência: </Text>
    </View>
  );
}
