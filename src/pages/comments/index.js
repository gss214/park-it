import React, { useState, useEffect} from "react"
import stylesGeneral from "../../components/style"
import styles from './style'
import { Rating } from 'react-native-ratings'
import * as ImagePicker from 'expo-image-picker';
import { auth, db} from "../../../firebase"
import {updatePassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {ActivityIndicator, View, Text, Image, TouchableOpacity} from "react-native"
import MapView, { Marker } from 'react-native-maps'
import { collection, getDocs, query, where } from "firebase/firestore";


export const Comments = (props) => {

    const [comments, setComments] = useState(null)
    const myquery = query(
        collection(db, "comments"), 
        console.log(props.route.params),
        where('parkID',"==",props.route.params[1]) 
        
    );

    async function getComments() {
        var commentslist = [];
        const commentssnapshot = await getDocs(myquery);
        commentssnapshot.forEach((doc) => {
            commentslist.push(...doc.data());
            console.log(doc.data())
        });
        setComments(commentslist)
    }
/*
    async function getCurrentUserData() {
      const users = collection(db, 'users')
      const userId = auth.currentUser.uid
      const user = query(users, where('userUid', '==', userId))


      await getDocs(user).then(querySnapshot => {
          
          querySnapshot.forEach((doc) => {
              const data = doc.data()

              const profileImage = data.profileImage    
              if(profileImage !== null && typeof profileImage !== "undefined") {
                  setSelectedImage(profileImage)
                  }
          })}).catch(error => {
              console.log(error)
          }) 
     }
  const [selectedImage, setSelectedImage] = useState(null);


  function Write() {
    var string = "";
    var star;
    <View style={styles.containerForm}>
      <TextInput
        style={stylesGeneral.input}
        placeholder="Coloque um número de 0 a 5"
        keyboardType='default'
        value={star}
        onChangeText={(star) => star}>
      </TextInput>

      <TextInput
        style={stylesGeneral.input}
        placeholder="Comentário"
        keyboardType='default'
        value={string}
        onChangeText={(string) => string}>
      </TextInput>
    </View>
  }*/

  useEffect(() => {
    getComments()
  }, [])

    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.containerForm}>
          <View style={styles.rowContanier}> 
           
         
          
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