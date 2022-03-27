import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e5e5',
        alignItems:'center'
    },
    title: {
        paddingLeft: 12,
        fontSize: 40,
        marginTop: 56,
        textAlign: 'center',
        fontFamily:'Courgette_400Regular',
        color: '#ffd358',
    },
    subTittle: {
        marginTop: 8,
        marginBottom: 48,
        textAlign: 'center',
        fontSize: 16,
        color: '#757575'
    },
    logo: {
        marginTop: 68,
        marginBottom: 32,
        width: 122,
        height: 44
    },
    buttonBox: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#88c9bf',
        height: 60,
        width: 100,
        marginTop: 32,
        marginBottom: 48,
        elevation: 5,
        shadowColor: 'black',
        alignSelf: 'center',
        borderRadius: 2,
      },
    buttonText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: '#434343',
      },
  });
  
export default styles