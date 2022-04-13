import React, { useState, useEffect} from "react"
import stylesGeneral from "../../components/style"
import styles from './style'
import { Rating } from 'react-native-ratings'
import * as ImagePicker from 'expo-image-picker';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard, Alert } from "react-native"
import { auth, db} from "../../../firebase"
import { collection, getDocs, query, where, updateDoc, doc} from "@firebase/firestore";
import {updatePassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Comments = (props) => {

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

  
  function Read() {
    const comment = props.route.params.comments.comment;
    const starCount = props.route.params.comments.rating;

    return {
      'comment': comment,
      'starCount': starCount
     
  }
  
    function Write() {
      var string 


    }
  }

  useEffect(() => {
    getCurrentUserData()
  }, [])

    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.containerForm}>
          <View style={styles.rowContanier}> 
            <Text style={{alignSelf:'center'}}>Comments</Text>
            {selectedImage !== null ? (
              <View>
                  <Image
                      source={{ uri: selectedImage }}
                      style={styles.photo}
                  />
              </View>
          ) : (
              <View>
                  <Image
                      source={require('../../../assets/account_icon.png')}
                      style={styles.photo}
                  />
              </View>
          )
          }

            <View style={styles.ratingView}>
                <Rating
                  style={styles.barRating}
                  type='star'
                  ratingCount={5}
                  startingValue={Read().starCount}
                  imageSize={20}
                  readonly={true}/>
            </View>
            <Text style={styles.espaco}>{Read().comment}</Text>

           <TouchableOpacity style={stylesGeneral.button}>
           <Text 
             style={stylesGeneral.textButton}
             onPress={() => Write()}
             >
             Adicionar Comentário
           </Text>
         </TouchableOpacity>
         </View>
        </View>
      </TouchableWithoutFeedback>
    );
}
