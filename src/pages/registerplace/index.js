import React, { useState } from 'react'
import { Alert, Text, View, TextInput, Image, TouchableOpacity} from "react-native"
import stylesGeneral from '../../components/style'
import styles from './style'

import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../firebase"
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const RegisterPlace = (props) => {

  const [Localization, setLocalization] = useState('');
  const [Private, setPrivate] = useState('');
  const [Name, setName] = useState('');
  const [ReferencePost, setReferencePost] = useState('');
  const [Time, setTime] = useState('');
  const [Covered, setCovered] = useState('');

  async function createPlace() {
    
      console.log('Local cadastrado com sucesso!\n' + value.user.email)
      Alert.alert("Sucesso", "Local cadastrado com sucesso")
      props.navigation.navigate('Home')
   
  };

  return (
    <View style={styles.containerForm}>
      
        
      <TextInput
        style={stylesGeneral.input}
        placeholder="Localização"
        keyboardType='default'
        value={Localization}
        onChangeText={(Localization) => setLocalization(Localization)}>
      </TextInput>
      <TextInput
        style={stylesGeneral.input}
        placeholder="Privado"
        keyboardType='default'
        value={Private}
        onChangeText={(Private) => setPrivate(Private)}>
      </TextInput>
      <TextInput
        style={stylesGeneral.input}
        placeholder="Nome"
        keyboardType='default'
        value={Name}
        onChangeText={(Name) => setName(Name)}>
      </TextInput>
      <TextInput 
        style={stylesGeneral.input} 
        placeholder="Posto de Referência"
        keyboardType='default' 
        value={ReferencePost}
        onChangeText={(ReferencePost) => setReferencePost(ReferencePost)}>
      </TextInput>
      <TextInput 
        style={stylesGeneral.input} 
        placeholder="Horario de Funcionamento"
        keyboardType='default' 
        value={Time}
        onChangeText={(Time) => setTime(Time)}>
      </TextInput>
      <TextInput 
        style={stylesGeneral.input} 
        placeholder="Coberto"
        keyboardType='default' 
        value={Covered}
        onChangeText={(Covered) => setCovered(Covered)}>
      </TextInput>

      
      <TouchableOpacity 
        style={stylesGeneral.button}
        onPress={() => createPlace()}>
        <Text style={stylesGeneral.textButton}>Salvar</Text>
      </TouchableOpacity>
      
    </View>
  );
}