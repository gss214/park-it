import React, { useState, useEffect} from "react"
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import stylesGeneral from "../../components/style"
import styles from './style'
import { auth } from "../../../firebase"
import database from 'firebase/database'
import { query } from "firebase/firestore";


export const Profile = (props) => {
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

    const [selectedImage, setSelectedImage] = useState(null);
    const [email, setEmail] = useState(null);
    const [placa, setPlaca] = useState(null);
    const [senha, setSenha] = useState(null);
    const [confirmarSenha, setConfirmarSenha] = useState(null);

    async function getCurrentUserData() {
        var user = auth.currentUser;
        setEmail(user.email)
        setPlaca(user.placa)
        console.log(user)
        var usersRef = database().ref('/users')
        var usuario =  query(usersRef, where("email", "==", user.email));
        
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
                    editable={false}
                    value={email}
                    keyboardType='email-address'
                    onChangeText={(email) => setEmail(email)}>
                </TextInput>
                <TextInput
                    style={stylesGeneral.input}
                    placeholder="Nome"
                    keyboardType='default'
                    onChangeText={(name) => setName(name)}>
                </TextInput>
                <TextInput
                    style={stylesGeneral.input}
                    placeholder="Placa do carro"
                    keyboardType='default'
                    value={placa}
                    onChangeText={(licensePlate) => setLicensePlate(licensePlate)}>
                </TextInput>
                <TextInput
                    style={stylesGeneral.input}
                    placeholder="Senha"
                    keyboardType='default'
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}>
                </TextInput>
                <TextInput
                    style={stylesGeneral.input}
                    placeholder="Confirmar Senha"
                    keyboardType='default'
                    secureTextEntry={true}
                    onChangeText={(passwordConfirmation) => setPasswordConfirmation(passwordConfirmation)}>
                </TextInput>
                <TouchableOpacity
                    style={stylesGeneral.button}
                    onPress={() => createUser()}>
                    <Text style={stylesGeneral.textButton}>Atualizar Perfil</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}
