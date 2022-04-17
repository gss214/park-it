import React, { useState, useEffect } from "react"
import {
  ActivityIndicator,
  View,
} from "react-native"
import styles from "./style"
import stylesGeneral from "../../components/style"
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Home = (props) => {

  const latitudeDelta = 0.04
  const longitudeDelta = 0.05

  const [location, setLocation] = useState(null)
  const [marker, setMarker] = useState({ latitude: -15.80825, longitude: -48.0088149 })
  const [region, setRegion] = useState({ latitude: -15.80825, longitude: -48.0088149 })
  const [errorMsg, setErrorMsg] = useState(null)
  const [parkingList, setParkingList] = useState(null)

  const myquery = query(collection(db, "parking"));

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }
    let _location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    setLocation({
      latitude: _location.coords.latitude,
      longitude: _location.coords.longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    })
    setRegion(location)
  }

  async function getParkingList() {
    const markerlist = [];
    const markersnapshot = await getDocs(myquery);
    markersnapshot.forEach((doc) => {
      markerlist.push({ ...doc.data(), id: doc.id });
    });
    setParkingList(markerlist)
  }

  useEffect(() => {
    getLocation()
    getParkingList()
  }, [])

  if (location == null || parkingList == null) {
    return <ActivityIndicator></ActivityIndicator>
  }

  return (
    <View style={stylesGeneral.container}>
      <MapView
        style={styles.mapView}
        initialRegion={location}
        region={region}
        showUserLocation={true}
        loadingEnabled={true}
      >
        {parkingList ? parkingList.map(parking => (
          <Marker key={parking.id}
            coordinate={{
              latitude: parking.coordinates.latitude,
              longitude: parking.coordinates.longitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta
            }}
            title={parking.name}
            description={"Clique aqui para ver mais detalhes"}
            image={require('../../../assets/app_logo.png')}
            onCalloutPress={() => props.navigation.navigate("TopTabNavigatorParking", { parking })}
          >
          </Marker>
        )) : null}
      </MapView>
      <View style={styles.search}>
        <GooglePlacesAutocomplete
          placeholder='Pesquisar Endereço ou Estacionamento'
          autoFocus={false}
          onPress={(data, details) => {
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta
            })
          }}
          query={{
            key: 'AIzaSyBoZ3p7Cxx0w13fN6XNqxak7vZm7IfhGtU',
            language: 'pt-br',
            components: 'country:br'
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={{ listView: { height: 300, position: 'absolute', top: 40 } }}
        />
      </View>

    </View>
  );
}
