import React from "react"
import {View, Text, Image, TouchableOpacity} from "react-native"
import styles from "./style"
import stylesGeneral from "../../components/style"

import { signOut } from "firebase/auth"
import { auth } from "../../../firebase";

export const Home = (props) => {

    var user = auth.currentUser;

    async function logout(){
        await signOut(auth)
        .then(() => {
            console.log('o usuario fez logout!');
            props.navigation.navigate('Login');
        })
        .catch(error => console.log(error))
    }

    return(
        <View style={stylesGeneral.container}>
           <Text style={{alignSelf:'center'}}>Olá!</Text>
           <TouchableOpacity 
            style={stylesGeneral.button}
            onPress={() => logout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        </View>
    );
}
