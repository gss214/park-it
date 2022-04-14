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
    const [region, setRegion] = useState({ latitude: 37.78825, longitude: -48.0088149})
    const [loading, setLoading] = useState(true);
    const [parkingSpots, setParkingSpots] = useState(null)
    const [emptyParkingSpots,setEmptyParkingSpots] = useState(null)
    const [closestParkingSpot, setClosestParkingSpot] = useState(null)
    
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
        });
        setParkingSpots(markerlist)
        return markerlist
    }

    async function getLocation(){
        let _location = await Location.getCurrentPositionAsync({enableHighAccuracy:true})
        setLocation({
            latitude: _location.coords.latitude,
            longitude: _location.coords.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
        })
        setRegion(location)
        return _location
    }

    async function getEmptySpots() {
        var markerlist = [];
        const markersnapshot = await getDocs(myquery);
        markersnapshot.forEach((doc) => {
            markerlist.push(...doc.data().parkSpotEmpty);
        });
        setEmptyParkingSpots(markerlist)
    }

    /*function getRegion(){
        let minX, maxX, minY, maxY;

        minX = Math.min(closestParkingSpot.latitude, location.latitude);
        maxX = Math.max(closestParkingSpot.latitude, location.latitude);
        minY = Math.min(closestParkingSpot.latitude, location.latitude);
        maxY = Math.max(closestParkingSpot.latitude, location.latitude);
        
        const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2;
        const deltaX = (maxX - minX), deltaY = (maxY - minY);

        setRegion({
            latitude: midX,
            longitude: midY,
            latitudeDelta: deltaX,
            longitudeDelta: deltaY
        })
    }*/

    const calculateDistance = (spot) => {
        var dis = getDistance(
          {latitude: spot.latitude, longitude: spot.longitute},
          {latitude: location.latitude, longitude: location.longitude},
        );
        return dis;
    };

    async function getClosestParkingSpot() {
        await getLocation()
        await getParkingSpots()

        console.log(location)
        console.log(parkingSpots)

        var minDist = -1, closestSpot = null;
        parkingSpots.map((spot) => {
            if(minDist == -1){
                minDist = calculateDistance(spot); closestSpot = spot;
            } 
            else{
                let auxDist = calculateDistance(spot)
                if(auxDist < minDist){
                    minDist = auxDist; closestSpot = spot;
                }
            }  
        })
        return closestSpot;
    }

    // fazer um loop com a distancia do usuario e as distancias das vagas
    // mostrar a localizacao do usuario como um ponto no mapa (carrinho?)
    
    // pesquisar pra ver se tem alguma funcao no bd que retorna se ele foi modificado
    useEffect(() => {
        //getParkingSpots(), 
        getEmptySpots(), 
        getClosestParkingSpot()
    }, [])

   /* useEffect(() => {
        getRegion(),
        setLoading(false)
    }, [closestParkingSpot, location])*/

    //if(parkingSpots != null && location != null) getClosestParkingSpot();
    //if(location != null && closestParkingSpot != null) getRegion();

    if (loading || parkingSpots == null || emptyParkingSpots == null || closestParkingSpot == null){ // || closestParkingSpot == null || location == null || region == null) {
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
                        pinColor={'green'}
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