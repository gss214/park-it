import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native"
import styles from './style'
import stylesGeneral from '../style';

export default function Login() {


    return (
        <View style={styles.containerForm}>
            
            <View style={styles.containerIcon}>
                <Image style={styles.appIconImage} source={require('../../../res/images/app_icon.png')}></Image>
            </View>

            <View style={styles.form}>
                <View >
                    {/* <Text style={stylesGeneral.formLabel}>Email: </Text> */}
                    <TextInput style={stylesGeneral.input}
                        placeholder="Email"
                        keyboardType='email-address'></TextInput>
                    {/* <Text style={stylesGeneral.formLabel}>Senha: </Text> */}
                    <TextInput style={stylesGeneral.input} keyboardType='default' placeholder="Senha" secureTextEntry={true}></TextInput>

                    <TouchableOpacity style={stylesGeneral.button}><Text style={stylesGeneral.textButton}>Entrar</Text></TouchableOpacity>
                </View>

                <Text style={styles.texto}>Não possui cadastro?</Text>
            </View>
        </View>

    );
}