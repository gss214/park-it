import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard, Alert } from "react-native"
import stylesGeneral from "../../components/style"
import styles from './style'
import { auth, db } from "../../../firebase"
import { collection, getDocs, query, where, updateDoc, doc } from "@firebase/firestore";
import { updatePassword } from "firebase/auth";
import { openImagePickerAsync, uploadImage } from '../../components/imagePicker'

export const Profile = (props) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [updatedProfilePictureFlag, setUpdateProfilePictureFlag] = useState(false)

  async function getCurrentUserData() {
    const users = collection(db, 'users')
    const userId = auth.currentUser.uid
    const user = query(users, where('userUid', '==', userId))

    await getDocs(user).then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()

        setEmail(data.email)
        setName(data.name)
        setLicensePlate(data.licensePlate)

        const profileImage = data.profileImage
        if (profileImage !== null && typeof profileImage !== "undefined") {
          setSelectedImage(profileImage)
        }
      })
    }).catch(error => {
      console.log(error)
    })
  }

  async function updateUser() {

    if (updatedProfilePictureFlag) {
      await uploadImage(auth.currentUser.uid, selectedImage)
    }

    updateDoc(doc(db, "users", auth.currentUser.uid), {
      name: name,
      licensePlate: licensePlate
    }).then(() => {
      console.log("Nome e placa alterados com sucesso")
    }).catch(error => {
      console.log("Erro ao atualizar nome e placa")
      console.log(error)
    })

    if (password.length >= 6) {
      updatePassword(auth.currentUser, password).then(() => {
        console.log("Senha atualizada com sucesso")
      }).catch((error) => {
        console.log("Erro ao atualizar senha")
        console.log(error)
      })
    }

    Alert.alert(
      "Perfil atualizado com sucesso",
      "Você será redirecionado para a página de vagas",
      [
        {
          text: "Ok",
          onPress: () => props.navigation.navigate('Vagas'),
          style: "cancel"
        }
      ]
    )
  }

  let handlerImagerPicker = async () => {
    let imageUri = await openImagePickerAsync()
    setSelectedImage(imageUri)
    if (imageUri !== undefined) {
      setUpdateProfilePictureFlag(true)
    }
  }

  useEffect(() => {
    getCurrentUserData()
  }, [])


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
          <TouchableOpacity style={stylesGeneral.button} onPress={handlerImagerPicker}>
            {
              selectedImage !== null ? (
                <View>
                  <Text style={stylesGeneral.textButton}>Alterar foto</Text>
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
          editable={false}
          value={email}
          keyboardType='email-address'
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
          onPress={() => updateUser()}>
          <Text style={stylesGeneral.textButton}>Atualizar Perfil</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
