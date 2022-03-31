import React, { useState, useEffect } from "react"
import {View, Text, Image, TouchableOpacity} from "react-native"
import styles from "./style"
import stylesGeneral from "../../components/style"
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { signOut } from "firebase/auth"
import { auth } from "../../../firebase"

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

  const [location, setLocation] = useState(null)
  const [destination, setDestination] = useState({ latitude: 37.78825, longitude: -122.4324 })
  const [marker, setMarker] = useState({ latitude: -15.879719, longitude: -122.4324})
  const [region, setRegion] = useState({ latitude: 37.78825, longitude: -48.0088149 })
  
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true})
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05
      })
      //setMarker(marker)
      //console.log(location)
    })();
  }, []);

  return(
    <View style={stylesGeneral.container}>
      <MapView 
        style={styles.mapView}
        initialRegion={location}
        region={region}
        showUserLocation={true}
        loadingEnabled={true}
      >
        <Marker
          coordinate={marker}
          title={"title"}
          description={"description"}  
          >
          <Image s
            source={require('../../../assets/app_logo.png')}
            style={{width: 90, height: 90}}
          />
        </Marker>
      </MapView>
      <View style={styles.search}>
          <GooglePlacesAutocomplete
            placeholder='Pesquisar Endereço ou Estacionamento'
            autoFocus={false}
            onPress={(data, details) => {

              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05
              })
              setMarker({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              })
              console.log(region)
              console.log(marker)
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
