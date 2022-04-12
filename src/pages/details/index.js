import React from "react"
import {View, Text, Image, TouchableOpacity} from "react-native"
import stylesGeneral from "../../components/style"

export const Details = (props) => {
    console.log("Teste")
    console.log(props.route.params.parking)
    return(
        <View style={stylesGeneral.container}>
           <Text style={{alignSelf:'center'}}>Details</Text>
        </View>
    );
}
