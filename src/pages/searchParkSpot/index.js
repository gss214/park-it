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

    const [location, setLocation] = useState(null)
    //const [region, setRegion] = useState({ latitude: 37.78825, longitude: -48.0088149})
    const [loading, setLoading] = useState(true);
    const [parkingSpots, setParkingSpots] = useState(null)
    const [emptyParkingSpots,setEmptyParkingSpots] = useState(null)

    const parkSpotIsEmpty = props.route.params.parkSpotEmpty
    const parkSpots = props.route.params.parkSpots
    const latitudeDelta = 0.002
    const longitudeDelta = 0.002
    const myquery = query(
        collection(db, "parking"), 
        where("name","==",props.route.params.name) 
    );

    async function getParkingSpots() {
        var markerlist = [];
        const markersnapshot = await getDocs(myquery);
        markersnapshot.forEach((doc) => {
            markerlist.push(...doc.data().parkSpots);
            //console.log(doc.data())
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

    // fazer um loop com a distancia do usuario e as distancias das vagas
    // mostrar a localizacao do usuario como um ponto no mapa (carrinho?)
    const calculateDistance = (spot) => {
        var dis = getDistance(
          {latitude: spot.latitude, longitude: spot.longitute},
          {latitude: location.latitude, longitude: location.longitude},
        );
    };
    
    // pesquisar pra ver se tem alguma funcao no bd que retorna se ele foi modificado
    useEffect(() => {getParkingSpots(), getEmptySpots(), setLoading(false)}, [])

    if (loading || parkingSpots == null || emptyParkingSpots == null) {
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
                
                {/** antes de ver as vagas vazias ja definir qual a vaga mais proxima
                 *   e ai trocar a cor dessa vaga pra mostrar que eh a mais proxima
                 *   e colocar na descricao tambem
                 * 
                 *   nos botoes pegar vaga e liberar vaga trocar a cor tambem dessa vaga
                 *   e mudar no bd se ta ocupado ou nao   
                 */}
                
                {parkingSpots ? parkingSpots.map((spot,index) => {
                    return emptyParkingSpots[index] ?
                    <Marker key ={index}
                      coordinate={{
                        latitude: spot.latitude,
                        longitude: spot.longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta
                      }}
                      title={index.toString()}
                      description={index.toString()}
                    >
                    </Marker>
                : null }) : null}

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

/**
 * <MapView 
                style={styles.mapView}
                initialRegion={({
                    latitude: props.route.params.coordinates.latitude,
                    longitude: props.route.params.coordinates.longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                    })}
                loadingEnabled={true}
            >
                
                {parkingSpots ? parkingSpots.map((spot,index) => {
                    return parkSpotIsEmpty[index] ?
                    <Marker key ={index}
                      coordinate={{
                        latitude: spot[index].latitude,
                        longitude: spot[index].longitude,
                        latitudeDelta: latitudeDelta,
                        longitudeDelta: longitudeDelta
                      }}
                    >
                    </Marker>
                : null}) : null}

            </MapView>
 **/