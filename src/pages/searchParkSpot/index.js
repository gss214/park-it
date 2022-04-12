import React, { useState, useEffect } from "react"
import {ActivityIndicator, View, Text, Image, TouchableOpacity} from "react-native"
import stylesGeneral from "../../components/style"
import styles from "./style"
import MapView, { Marker } from 'react-native-maps'
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import {getDistance} from 'geolib';
import * as Location from 'expo-location'

export const SearchParkSpot = (props) => {

    //const [location, setLocation] = useState(null)
    //const [region, setRegion] = useState({ latitude: 37.78825, longitude: -48.0088149})
    const [loading, setLoading] = useState(true);
    const [parkingSpots, setParkingSpots] = useState(null)

    const parkSpotIsEmpty = props.route.params.parkSpotEmpty
    const parkSpots = props.route.params.parkSpots
    const latitudeDelta = 0.002
    const longitudeDelta = 0.002
    const myquery = query(collection(db, "parking"));

    async function getParkingSpots() {
        const markerlist = [];
        const markersnapshot = await getDocs(myquery);
        markersnapshot.forEach((doc) => {
            markerlist.push({...doc.data().parkSpotEmpty, id: doc.id});
        });
        setParkingSpots(markerlist)
        //setLoading(false)
    }

    const calculateDistance = () => {
        var dis = getDistance(
          {latitude: 20.0504188, longitude: 64.4139099},
          {latitude: 51.528308, longitude: -0.3817765},
        );
    };
    
    // is returning null???
    useEffect(() => {
        getParkingSpots()
        setLoading(false)
        console.log(parkingSpots)
    }, [])

    if (loading) {
        return <ActivityIndicator></ActivityIndicator>
    }
    
    return(
        <View style={stylesGeneral.container} >   
            <TouchableOpacity style={styles.buttonVoltar} onPress={() => props.navigation.navigate("TopTabNavigatorParking")}>
                <Image style={styles.voltar} source={require('../../../assets/voltar.png')}/>
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
                
                {parkSpots ? parkSpots.map((spot,index) => {
                    return parkSpotIsEmpty[index] ?
                    <Marker key ={index}
                      coordinate={{
                        latitude: spot.latitude,
                        longitude: spot.longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta
                      }}
                    >
                    </Marker>
                : null}) : null}

            </MapView>

            <TouchableOpacity style={styles.button1}>
                <Text 
                    style={stylesGeneral.textButton}
                    //onPress={() => props.navigation.navigate("SearchParkSpot")}
                >
                Pegar Vaga
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button2}>
                <Text 
                    style={stylesGeneral.textButton}
                    //onPress={() => props.navigation.navigate("SearchParkSpot")}
                >
                Liberar Vaga
                </Text>
            </TouchableOpacity>
        </View>
        
    );
}