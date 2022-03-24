import React from 'react'
import { Text, View, TextInput, Button, Image, TouchableOpacity} from "react-native"
import stylesGeneral from '../style';
import styles from './style'

export default function Register() {


    return (
        <View>
            <View>
                <Image source={require('../../../res/images/account_icon.png')}></Image>
                <TouchableOpacity style={stylesGeneral.button} ><Text style={stylesGeneral.textButton}>Adicionar Foto</Text></TouchableOpacity>
            </View>

            <View>
                <Text>Email: </Text>
                <TextInput
                    style={stylesGeneral.input}
                    placeholder="Ex. joaosilva@gmail.com"
                    keyboardType='email-address'></TextInput>

                <Text>Nome: </Text>
                <TextInput
                style={stylesGeneral.input}
                    placeholder="Ex. Joao da Silva"
                    keyboardType='default'>
                </TextInput>

                <Text>Placa do Carro: </Text>
                <TextInput
                style={stylesGeneral.input}
                    placeholder="Ex. AAAA-1111"
                    keyboardType='default'>
                </TextInput>


                <Text>Senha: </Text>
                <TextInput style={stylesGeneral.input} keyboardType='default' secureTextEntry={true}></TextInput>

                <Text>Confirmar senha: </Text>
                <TextInput style={stylesGeneral.input} keyboardType='default' secureTextEntry={true}></TextInput>


            </View>
            <TouchableOpacity style={stylesGeneral.button}><Text style={stylesGeneral.textButton}>Cadastrar</Text></TouchableOpacity>
            <Text>Já possui cadastro?</Text>
        </View>
    );
}