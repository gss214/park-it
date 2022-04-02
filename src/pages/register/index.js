import React, { useState } from 'react'
import { 
  Alert, 
  Text, 
  View, 
  TextInput, 
  Keyboard,
  Image, 
  TouchableOpacity,
  TouchableWithoutFeedback} from "react-native"
import stylesGeneral from '../../components/style'
import styles from './style'

import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../firebase"
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Register = (props) => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage(pickerResult.uri);
  }

  const uploadImage = async (id) => {
    const uploadUri = selectedImage;
    const uriSplit = uploadUri.split('.');
    const fileExtension = uriSplit[uriSplit.length - 1];

    const response = await fetch(uploadUri);
    const blob = await response.blob(); 

    const storage = getStorage();
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `userProfilePictures/${id}.${fileExtension}`);

    uploadBytes(imageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(imageRef)
      .then(async url =>  {
        await updateDoc(doc(db, "users", id), {
          profileImage: url,
        })
      })
      .catch(async e => {
        console.log(e);
        await updateDoc(doc(db, "users", id), {
          profileImage: null,
        })
      })
    })
  } 

  async function createUser() {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      await setDoc(doc(db, "users", value.user.uid), {
        email: email,
        name: name,
        licensePlate: licensePlate
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
      console.log('usuario cadastrado com sucesso!\n' + value.user.email)
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso")
      props.navigation.navigate('Login')
    })
    .catch(error => console.log(error)
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.containerForm}>
        <View style={styles.rowContanier}>
          {selectedImage !== null ? (
                <View>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.photo}
                  />
                </View>
              ) : (
                <>
                <Image
                    source={require('../../../assets/account_icon.png')}
                    style={styles.photo}
                  />
                  </>
                )
              }
          <TouchableOpacity style={stylesGeneral.button} onPress={openImagePickerAsync}>
            {
              selectedImage !== null ? (
                <View>
                  <Text style={stylesGeneral.textButton}>Adicionar foto</Text>
                </View>
              ) : (
                <>
                  <Text style={stylesGeneral.textButton}>Adicionar foto</Text>
                  </>
                )
              }
          </TouchableOpacity>
        </View>
        <TextInput
          style={stylesGeneral.input}
          placeholder="Email"
          keyboardType='email-address'
          value={email}
          onChangeText={(email) => setEmail(email)}>
        </TextInput>
        <TextInput
          style={stylesGeneral.input}
          placeholder="Nome"
          keyboardType='default'
          value={name}
          onChangeText={(name) => setName(name)}>
        </TextInput>
        <TextInput
          style={stylesGeneral.input}
          placeholder="Placa do carro"
          keyboardType='default'
          value={licensePlate}
          onChangeText={(licensePlate) => setLicensePlate(licensePlate)}>
        </TextInput>
        <TextInput 
          style={stylesGeneral.input} 
          placeholder="Senha"
          keyboardType='default' 
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}>
        </TextInput>
        <TextInput
          style={stylesGeneral.input} 
          placeholder="Confirmar Senha"
          keyboardType='default'
          secureTextEntry={true}
          value={passwordConfirmation}
          onChangeText={(passwordConfirmation) => setPasswordConfirmation(passwordConfirmation)}>
        </TextInput>
        <TouchableOpacity 
          style={stylesGeneral.button}
          onPress={() => createUser()}>
          <Text style={stylesGeneral.textButton}>Cadastrar</Text>
        </TouchableOpacity>
        <Text
          onPress={() => props.navigation.navigate("Login")}>
          Já possui cadastro?</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}