import React from "react"
import {View, Text, Image, TouchableOpacity} from "react-native"
import stylesGeneral from "../../components/style"

export const Comments = (props) => {

  async function Write() {
        $(function(){
        $("#form").submit(function(e){
            // Criando comentario
            var data = {};
            data.name = $("#name").val();
            data.comment = $("#comment").val();
            var url = "http://www.someurl.com/post_comment.php";
            $.POST(url, data)
            .done(function(response){
                $("#comments").append(response);
            });
            e.preventDefault();
        });
    });
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
