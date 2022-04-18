import React from "react"
import { View, Text } from "react-native"
import styles from "./style"
import { Rating } from 'react-native-ratings'

export const Details = (props) => {

  function getData() {

    const starCount = props.route.params.parking.ratingTotalStars;
    const avaliationCount = props.route.params.parking.ratingUsers;
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

  return (
    <View style={styles.espaco}>
      <Text style={styles.borda}>Endereço:  </Text>
      <Text style={styles.espaco}>{props.route.params.parking.name}{getData().address}</Text>

      <Text >Média de avaliações: </Text>
      <View style={styles.ratingView}>

        <Rating
          style={styles.barRating}
          type='star'
          ratingCount={5}
          startingValue={getData().avaliation.toFixed(2)}
          imageSize={28}
          readonly={true} />
        <Text style={styles.rating}>  {getData().avaliation.toFixed(2)}</Text>
      </View>

      <Text >Privado: </Text>
      <Text style={styles.espaco}>{getData().isPrivate}</Text>

      <Text >Ponto de referência: </Text>
      <Text style={styles.espaco}>{getData().reference}</Text>

      <Text >Horario de Funcionamento: </Text>
      <Text style={styles.espaco}>{getData().hour}</Text>

      <Text >Coberto: </Text>
      <Text style={styles.espaco}>{getData().isCovered}</Text>

    </View>
  );
}
