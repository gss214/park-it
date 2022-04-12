import React from "react"
import {View, Text, Image, TouchableOpacity} from "react-native"
import stylesGeneral from "../../components/style"

export const Comments = (props) => {
  function Read() {
    const name = props.route.params.comments.name;
    const rating = props.route.params.comments.rating;
    const comment = props.route.params.comments.comment;
   
    return {
      'comment': comment,
      'name': name,
      'rating': rating
  }
  
  function Write() {
    
    }
  }

    return(
        <View style={stylesGeneral.container}>
           <Text style={{alignSelf:'center'}}>Comments</Text>

           <TouchableOpacity style={stylesGeneral.button}>
           <Text 
             style={stylesGeneral.textButton}
             onPress={() => Write()}
             >
             Adicionar Comentário
           </Text>
         </TouchableOpacity>

        </View>
    );
}
