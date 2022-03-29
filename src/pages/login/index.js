import React, { useState } from 'react'
import { Alert, Text, View, TextInput, TouchableOpacity, Image } from "react-native"
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
      props.navigation.navigate('Home');
    })
    .catch(error => {
        console.log(error);
      }
    );
  };

  return (
   <View style={styles.containerForm}>    
     <Image style={styles.appIconImage} source={require('../../../assets/app_logo.png')}></Image>
       <View style={styles.form}>
          <TextInput 
            style={stylesGeneral.input}
            placeholder="Email"
            keyboardType='email-address'
            value={email}
            onChangeText={text => setEmail(text)}>
          </TextInput>
          <TextInput 
            style={stylesGeneral.input} 
            keyboardType='default' 
            placeholder="Senha"
            value={password}
            onChangeText={text => setPassword(text)} 
            secureTextEntry={true}>
          </TextInput>
          <TouchableOpacity style={stylesGeneral.button}>
            <Text 
              style={stylesGeneral.textButton}
              onPress={() => Login()}>
              Entrar
            </Text>
          </TouchableOpacity>
         <Text 
           style={styles.text}
           onPress={() => props.navigation.navigate("Register")}>
           Não possui cadastro?
         </Text>
      </View>
  </View>
  );
}