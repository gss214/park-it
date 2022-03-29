import React from "react"
import {View, Text, Image, TouchableOpacity} from "react-native"
import stylesGeneral from "../../components/style"

export const Profile = (props) => {
    return(
        <View style={stylesGeneral.container}>
           <Text style={{alignSelf:'center'}}>Profile</Text>
        </View>
    );
}
