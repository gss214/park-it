import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    photo: {
        width: 50,
        height: 50,
        overflow:'hidden',
        borderRadius: 150/2,
        shadowColor: 'black',
        marginRight: 10,
    },
    rowContanier: {
        flexDirection:'row',
        marginLeft: 60,
        marginTop: 20,
    }
});

export default styles;