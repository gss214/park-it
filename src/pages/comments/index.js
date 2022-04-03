import React from "react"
import {View, Text, Image, TouchableOpacity} from "react-native"
import stylesGeneral from "../../components/style"

export const Comments = (props) => {
    return(
        <View style={stylesGeneral.container}>
           <Text style={{alignSelf:'center'}}>Comments</Text>
        </View>
    );
}
