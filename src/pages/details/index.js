import React from "react"
import {View, Text, Image, TouchableOpacity} from "react-native"
import stylesGeneral from "../../components/style"
import styles from "./style"

export const Details = (props) => {

  function getFormattedData() {
    const starCount = props.route.params.parking.rating[0];
    const avaliationCount = props.route.params.parking.rating[1];
    const businessHours = props.route.params.parking.businessHours;
    const referencePoint = props.route.params.parking.referencePoint;
    const isCovered = props.route.params.parking.isPrivate ? "Estacionamento Coberto" : "Estacionamento Descoberto"

    var avaliation = 0
    if (avaliationCount != 0)
      avaliation = starCount / avaliationCount

    const isPrivate = props.route.params.parking.isPrivate ? "Estacionamento Privado" : "Estacionamento Público"

    var address = props.route.params.parking.address
 
    return {
      'address': address,
      'avaliation': avaliation,
      'starCount': starCount,
      'isPrivate': isPrivate,
      'hour': businessHours,
      'isCovered': isCovered,
      'reference': referencePoint
    }
  }

    return(
        <View style={stylesGeneral.overviewContainer}>
        <Text style={{alignSelf:'center'}}>Endereço: {props.route.params.parking.name} </Text>
        <Text style={styles.overviewItem}>{getFormattedData().address}</Text>
        <Text style={{alignSelf:'center'}}>Média de avaliações: </Text>
        <View style={styles.ratingView}>
          <Text style={styles.rating}>{getFormattedData().avaliation}</Text>
          <Rating
            style={styles.barRating}
            type='star'
            ratingCount={5}
            startingValue={getFormattedData().avaliation}
            imageSize={30}
            readonly={true}/>

        
        <Text style={styles.starCount}>({getFormattedData().starCount} )</Text>
        </View>

        <Text style={{alignSelf:'center'}}>Privado: </Text>
        <Text style={styles.overviewItem}>({getFormattedData().isPrivate})</Text>
        
        <Text style={{alignSelf:'center'}}>Ponto de referência: </Text>
        <Text style={styles.overviewItem}>({getFormattedData().referencePoint})</Text>
        
        <Text style={{alignSelf:'center'}}>Horario de Funcionamento: </Text>
        <Text style={styles.overviewItem}>({getFormattedData().businessHours})</Text>
        
        <Text style={{alignSelf:'center'}}>Coberto: </Text>
        <Text style={styles.overviewItem}>({getFormattedData().isCovered})</Text>
        
        </View>
        
    );
}
