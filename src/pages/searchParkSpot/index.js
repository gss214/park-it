import React, { useState, useEffect } from "react"
import { ActivityIndicator, View, Text, Image, TouchableOpacity } from "react-native"
import stylesGeneral from "../../components/style"
import styles from "./style"
import MapView, { Marker } from 'react-native-maps'
import { db } from "../../../firebase";
import { collection, getDocs, query, updateDoc, doc, where } from "firebase/firestore";
import * as Location from 'expo-location'
import { useIsFocused } from "@react-navigation/native";

export const SearchParkSpot = (props) => {

  const [location, setLocation] = useState(null)
  const [parkingSpots, setParkingSpots] = useState(null)
  const [emptyParkingSpots, setEmptyParkingSpots] = useState(null)
  const [closestParkingSpot, setClosestParkingSpot] = useState(null)
  const [yourSpot, setYourSpot] = useState(null)

  const latitudeDelta = 0.002
  const longitudeDelta = 0.002
  const PI_RAD = Math.PI / 180.0;
  const isFocused = useIsFocused()

  const myquery = query(
    collection(db, "parking"),
    where("name", "==", props.route.params.name)
  );

  async function getLocation() {
    let _location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    setLocation({
      latitude: _location.coords.latitude,
      longitude: _location.coords.longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    })
  }

  async function getParkingSpots() {
    var markerlist = [];
    const markersnapshot = await getDocs(myquery);
    markersnapshot.forEach((doc) => {
      markerlist.push(...doc.data().parkSpots);
    });
    setParkingSpots(markerlist)
  }

  async function getEmptySpots() {
    var markerlist = [];
    const markersnapshot = await getDocs(myquery);
    markersnapshot.forEach((doc) => {
      markerlist.push(...doc.data().parkSpotEmpty);
    });
    setEmptyParkingSpots(markerlist)
  }

  const calculateDistance = (spot) => {
    var phi1 = spot.latitude * PI_RAD;
    var phi2 = location.latitude * PI_RAD;
    var lam1 = spot.longitude * PI_RAD;
    var lam2 = location.longitude * PI_RAD;

    return 6371.01 * Math.acos(Math.sin(phi1) * Math.sin(phi2) + Math.cos(phi1) * Math.cos(phi2) * Math.cos(lam2 - lam1)) * 1000;
  }

  function getClosestParkingSpot() {
    var minDist = -1, closestSpot = null;
    parkingSpots.map((spot, index) => {
      if (emptyParkingSpots[index]) {
        if (minDist == -1) {
          minDist = calculateDistance(spot); closestSpot = { spot: spot, id: index };
        }
        else {
          let auxDist = calculateDistance(spot)
          if (auxDist < minDist) {
            minDist = auxDist; closestSpot = { spot: spot, id: index };
          }
        }
      }
    })
    setClosestParkingSpot(closestSpot)
  }

  async function updateEmptySpots(spotId, isEmpty) {

    let _spotEmpty = []

    emptyParkingSpots.map((spot, index) => {
      if (index == spotId) {
        _spotEmpty.push(isEmpty)
        setYourSpot({ spot: spot, id: index })
      }
      else {
        _spotEmpty.push(spot)
      }
    })

    console.log(_spotEmpty)
    setEmptyParkingSpots(_spotEmpty)

    updateDoc(doc(db, "parking", props.route.params.id), {
      parkSpotEmpty: _spotEmpty
    }).then(() => {
      console.log("Vaga atualizada")
    }).catch(error => {
      console.log("Erro ao atualizar vaga")
      console.log(error)
    })
  }

  function availableSpots() {
    let aux = false
    emptyParkingSpots.map((spot) => {
      if (spot == true) aux = true
    })
    return (aux ? true : false)
  }

  useEffect(() => {
    getParkingSpots()
    getEmptySpots()
    getLocation()
  }, [isFocused])

  useEffect(() => {
    if (parkingSpots !== null && location !== null) getClosestParkingSpot()
  }, [emptyParkingSpots])

  if (parkingSpots == null || emptyParkingSpots == null || location == null) {
    return <ActivityIndicator></ActivityIndicator>
  }

  if (closestParkingSpot == null && availableSpots()) {
    getClosestParkingSpot()
    return <ActivityIndicator></ActivityIndicator>
  }

  console.log(closestParkingSpot)


  return (
    <View style={stylesGeneral.container} >
      <TouchableOpacity style={styles.buttonVoltar} onPress={() => props.navigation.navigate("TopTabNavigatorParking")}>
        <Image style={styles.voltar} source={require('../../../assets/voltar.png')} />
      </TouchableOpacity>

      <MapView
        style={styles.mapView}
        initialRegion={({
          latitude: props.route.params.coordinates.latitude,
          longitude: props.route.params.coordinates.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        })}
        loadingEnabled={true}
      >

        {parkingSpots ? parkingSpots.map((spot, index) => {
          if (closestParkingSpot !== null) {
            if (spot == closestParkingSpot.spot && emptyParkingSpots[index] == true) {
              return <Marker key={'closest'}
                pinColor={'gold'}
                coordinate={{
                  latitude: spot.latitude,
                  longitude: spot.longitude,
                  latitudeDelta: latitudeDelta,
                  longitudeDelta: longitudeDelta
                }}
                title={'Vaga mais próxima!'}
              ></Marker>
            }
            else if (emptyParkingSpots[index]) {
              return <Marker key={index}
                coordinate={{
                  latitude: spot.latitude,
                  longitude: spot.longitude,
                  latitudeDelta: latitudeDelta,
                  longitudeDelta: longitudeDelta
                }}
              ></Marker>
            }
            else return null
          }
          else {
            return null
          }
        }) : null}

        <Marker 
          image={require('../../../assets/carro.png')}
          key ={'location'} coordinate={location}
        />

      </MapView>

      <TouchableOpacity style={styles.button1} disabled={closestParkingSpot == null ? true : false} onPress={() => updateEmptySpots(closestParkingSpot.id, false)}>
        <Text style={stylesGeneral.textButton}>
          Pegar Vaga
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} disabled={yourSpot == null ? true : false} onPress={() => updateEmptySpots(yourSpot.id, true)}>
        <Text style={stylesGeneral.textButton}>
          Liberar Vaga
        </Text>
      </TouchableOpacity>
    </View>

  );
}