import React, { useState, useRef} from "react"
import stylesGeneral from "../../components/style"
import styles from './style'
import { Rating } from 'react-native-ratings'
import { db, auth } from "../../../firebase"
import { addDoc, collection } from 'firebase/firestore'
import {Alert, TextInput, View, Text, Image, Keyboard, TouchableOpacity,TouchableWithoutFeedback} from "react-native"


export const NewComment = (props) => {

    const user = auth.currentUser
    const id = props.route.params
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(5)
    
    async function createComment() {
      try{
        await addDoc(collection(db, "comments"), {
          comment: comment,
          parkingId: id,
          rating:rating,
          userId: user.uid
        })
        Alert.alert("Sucesso", "Comentário cadastrado com sucesso")
        props.navigation.navigate('TopTabNavigatorParking')
      } catch (error){
        console.error(error)
      } 
    }

    function ratingCompleted(rating){
      setRating(rating)
    }

    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.containerForm}>
        <TextInput
          style={styles.inputContainer}
          placeholder="Adicionar Comentário"
          keyboardType='default'
          value={comment}
          multiline={true}
          onChangeText={(comment) => setComment(comment)}>
        </TextInput>
        <Rating
            style={styles.barRating}
            type='star'
            ratingCount={5}
            startingValue={5}
            imageSize={30}
            onFinishRating={ratingCompleted}/>
        <TouchableOpacity 
          style={stylesGeneral.button}
          onPress={() => createComment()}>
          <Text style={stylesGeneral.textButton}>Salvar</Text>
        </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
}
