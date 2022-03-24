import { StyleSheet } from "react-native";

/*  
    I think here we can place styles used in several parts of the app.
*/
const stylesGeneral = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#6FD34B',
      color: '#FFFFFF',
      borderRadius: 50,
      padding: 10,
      marginBottom: 15,
      alignItems: "center"
    }, 
    input: {
        borderRadius: 50,
        height: 40,
        backgroundColor: "#F3F3F3",
        marginTop: 5,
        marginBottom: 5,
        padding: 10
    },
    textButton: {
        fontSize: 20,
        color: "#FFFFFF"
    },
    formLabel: {
        color: "#000000",
        fontSize: 18,   
    },
    appIcon: {
        width: "90%",
        height: "40%"
    }
});

export default stylesGeneral;