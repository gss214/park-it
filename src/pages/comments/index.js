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


export const Comments = (props) => {

    const id=props.route.params.parking.id
    //console.log(id)
    const [comments, setComments] = useState(null)
    const [ratinglist, setRatings] = useState('')
    const [commentlist, setMensage] = useState('')
    const [namelist, setName] = useState('');
    var count;
    const myquery = query(
        collection(db, "comments"), 
        //console.log(props.route.params.id),
        where('parkID',"==",id) 
        
    );


    async function getComments() {
        var commentslist = [];
        var namelist = [];
        var ratinglist = [];
        var commentlist = [];
        count=0;

        const commentssnapshot = await getDocs(myquery);
        commentssnapshot.forEach((doc) => {
            const data = doc.data()
            commentslist.push(...doc.data());
            console.log(doc.data())
            React.useEffect(() => {
              setName(data.name);
            }, [count]);
            React.useEffect(() => {
              setRatings(data.rating);
            }, [count]);
            React.useEffect(() => {
              setMensage(data.comment);
            }, [count]);

            //namelist[count]=data.name
            //ratinglist[count]=data.rating
            //commentlist[count]=data.comment
            count++
        });
        setComments(commentslist)
        //setRatings(ratinglist)
        //setMensage(commentlist)
        //setName(namelist)
        console.log(commentslist)
        return commentslist
    }

/*
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
          
          <TextInput
                    style={stylesGeneral.input}
                    placeholder="Nome"
                    keyboardType='default'
                    value={namelist}
                    onChangeText={(namelist) => setName(namelist)}>
          </TextInput>
          <TextInput  style={stylesGeneral.input}
                      placeholder="Comment"
                      keyboardType='default'
                      Text={getComments()}>
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