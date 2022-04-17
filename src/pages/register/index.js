import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native"
import stylesGeneral from '../../components/style'
import styles from './style'

import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../firebase"
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { openImagePickerAsync, uploadImage } from '../../components/imagePicker'

export const Register = (props) => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function validationRegister() {
    if (name.length < 4) {
      Alert.alert("Erro", "O nome tem que ter pelo menos 3 caracteres")
      return
    } else if (password !== passwordConfirmation) {
      Alert.alert("Erro", "Senhas não conferem")
      return
    }
    setLoading(true)
    createUser()
  }

  async function createUser() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        await setDoc(doc(db, "users", value.user.uid), {
          email: email,
          name: name,
          licensePlate: licensePlate,
          userUid: value.user.uid
        })
        if (selectedImage !== null) {
          try {
            await uploadImage(value.user.uid, selectedImage)
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
      .catch(function (error) {
        setLoading(false)
        if (error.code == 'auth/invalid-email') {
          Alert.alert("Erro", "Email invalido")
        } else if (error.code == 'auth/weak-password') {
          Alert.alert("Erro", "A senha tem que ter no mínimo 6 caracteres")
        } else if (error.code == 'email-already-in-use') {
          Alert.alert("Erro", "Email já utilizado")
        }
        else {
          Alert.alert("Erro", "Ocorreu um erro, tente novamente mais tarde")
        }
        console.log(error)
      });
  };

  let handlerImagerPicker = async () => {
    let imageUri = await openImagePickerAsync()
    setSelectedImage(imageUri)
  }

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
            <View>
              <Image
                source={require('../../../assets/account_icon.png')}
                style={styles.photo}
              />
            </View>
          )
          }
          <TouchableOpacity style={stylesGeneral.button} onPress={() => handlerImagerPicker()}>
            <View>
              <Text style={stylesGeneral.textButton}>Adicionar foto</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TextInput
          style={stylesGeneral.input}
          placeholder="Email"
          keyboardType='email-address'
          value={email}
          onChangeText={(email) => setEmail(email.replace(/\s*$/, ""))}>
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
          onChangeText={(licensePlate) => setLicensePlate(licensePlate.replace(/\s*$/, ""))}>
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
          onPress={() => validationRegister()}>
          <Text style={stylesGeneral.textButton}>Cadastrar</Text>
        </TouchableOpacity>
        <Text
          onPress={() => props.navigation.navigate("Login")}>
          {loading ? <ActivityIndicator size="large" color='#0000ff'></ActivityIndicator> : "Já possui cadastro?"}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}