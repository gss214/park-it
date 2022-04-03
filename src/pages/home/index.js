import React, { useState, useEffect } from "react"
import {
  ActivityIndicator,
  View, 
  Text, 
  Image, 
  TouchableOpacity} from "react-native"
import styles from "./style"
import stylesGeneral from "../../components/style"
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { signOut } from "firebase/auth"
import { auth } from "../../../firebase"
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Home = (props) => {

  var user = auth.currentUser;

  async function logout(){
    await signOut(auth)
      .then(() => {
      console.log('o usuario fez logout!')
      props.navigation.navigate('Login')
      })
    .catch(error => console.log(error))
  }

  const latitudeDelta = 0.04
  const longitudeDelta = 0.05

  const [location, setLocation] = useState(null)
  const [marker, setMarker] = useState({ latitude: 37.78825, longitude: -48.0088149 })
  const [region, setRegion] = useState({ latitude: 37.78825, longitude: -48.0088149})
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(true);
  const [parkingList, setParkingList] = useState(null)

  const myquery = query(collection(db, "parking"));

  async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }
      let _location = await Location.getCurrentPositionAsync({enableHighAccuracy:true})
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
    setLoading(false)
  }

  useEffect(() => {
    getLocation()
    getParkingList()
  }, [])

  if (loading) {
    return <ActivityIndicator></ActivityIndicator>
  }

  return(
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
            onCalloutPress={() => props.navigation.navigate("TopTabNavigatorParking", {parking})}
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
              key: 'AIzaSyA_bq5mqJAP_hSzNiwxSm6ItbY_nW_Hqhk',
              language: 'pt-br',
              components: 'country:br'
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            styles={{listView: {height: 300, position:'absolute', top:40}}}
          />
        </View>

    </View>  
  );
}
