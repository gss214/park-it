import React, { useState } from 'react'
import { 
  Alert,
  Text, 
  View, 
  Keyboard,
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Image } from "react-native"
import styles from './style'
import stylesGeneral from '../../components/style'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../../firebase'

export const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function Login() {
    await signInWithEmailAndPassword(auth, email, password)
    .then(value => {
      console.log('usuario logado com sucesso! ' + value.user.email);
      props.navigation.navigate('TopTabNavigator');
    })
    .catch(function (error) { 
      Alert.alert("Erro", "Não foi possivel fazer login")
      console.log(error)
    })
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.containerForm}>    
        <Image style={styles.appIconImage} source={require('../../../assets/app_logo.png')}></Image>
          <View style={styles.form}>
            <TextInput 
              style={stylesGeneral.input}
              placeholder="Email"
              keyboardType='email-address'
              value={email}
              onChangeText={email => setEmail(email.replace(/\s*$/,""))}>
            </TextInput>
            <TextInput 
              style={stylesGeneral.input} 
              keyboardType='default' 
              placeholder="Senha"
              value={password}
              onChangeText={password => setPassword(password)} 
              secureTextEntry={true}>
            </TextInput>
            <TouchableOpacity 
              style={stylesGeneral.button}
              onPress={() => Login()}>
                <Text style={stylesGeneral.textButton}> Entrar </Text>
            </TouchableOpacity>
            <Text 
              style={styles.text}
              onPress={() => props.navigation.navigate("Register")}>
              Não possui cadastro?
            </Text>
        </View>
    </View>
  </TouchableWithoutFeedback>
  );
}