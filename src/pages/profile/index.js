import React, { useState, useEffect} from "react"
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import stylesGeneral from "../../components/style"
import styles from './style'
import { auth, db} from "../../../firebase"
import { collection, getDocs, query, where, updateDoc, doc} from "@firebase/firestore";
import {updatePassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const Profile = (props) => {
    let openImagePickerAsync = async () => {
        setUpdateProfilePictureFlag(true)
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
                if(profileImage !== null && typeof profileImage !== "undefined") {
                    setSelectedImage(profileImage)
                }
        })}).catch(error => {
            console.log(error)
        }) 
    }

    async function updateUser() {

        if(updatedProfilePictureFlag) {
            try {
                uploadImage(auth.currentUser.uid)
            } catch {
                await updateDoc(doc(db, "users", value.user.uid), {
                profileImage: null,
                })
            }
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
        
        if(password.length >= 6) {
            updatePassword(auth.currentUser, password).then(() => {
                console.log("Senha atualizada com sucesso")
            }).catch((error) => {
                console.log("Erro ao atualizar senha")
                console.log(error)
            })
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
                    <TouchableOpacity style={stylesGeneral.button} onPress={openImagePickerAsync}>
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
