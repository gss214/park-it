import React, { useState, useEffect} from "react"
import stylesGeneral from "../../components/style"
import styles from './style'
import { Rating } from 'react-native-ratings'
import * as ImagePicker from 'expo-image-picker';
import { auth, db} from "../../../firebase"
import {updatePassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {ActivityIndicator, TextInput, View, Text, Image, TouchableOpacity,TouchableWithoutFeedback} from "react-native"
import MapView, { Marker } from 'react-native-maps'
import { collection, getDocs, query, where } from "firebase/firestore";


export const newComments = (props) => {

    const id=props.route.params.parking.id
    //console.log(id)
    const [comments, setComments] = useState(null)
    const [ratinglist, setRatings] = useState('')
    const [commentlist, setMensage] = useState('')
    const [namelist, setName] = useState('');

    const myquery = query(
        collection(db, "comments"), 
        //console.log(props.route.params.id),
        where('parkID',"==",id) 
        
    );

    async function createComment() {
      await createUserComment(auth, star, comment)
      .then(async (value) => {
        await setDoc(doc(db, "users", value.user.uid), {
          star: star,
          name: name,
          comment: comment,
          userUid: value.user.uid
        })
        if (selectedImage !== null) {
          try {
            uploadImage(value.user.uid)
          } catch {
            await updateDoc(doc(db, "users", value.user.uid), {
              profileImage: null,
            })
          }
        }
        console.log('usuario cadastrado com sucesso!\n' + value.user.email + value.user.uid)
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso")
        props.navigation.navigate('Login')
      })
      .catch(error => console.log(error));
    };

    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.containerForm}>
          <View style={styles.rowContanier}> 
          
          <TextInput
                    style={stylesGeneral.input}
                    placeholder="Nome"
                    keyboardType='default'
                    value={namelist}
                    onChangeText={(namelist) => setName(namelist)}>
                </TextInput>
          
         </View>
        </View>
      </TouchableWithoutFeedback>
    );
}
/*
<TouchableOpacity style={stylesGeneral.button}>
<Text 
  style={stylesGeneral.textButton}
  onPress={() => Write()}
  >
  Adicionar Comentário
</Text>
</TouchableOpacity>*/