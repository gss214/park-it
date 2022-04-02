import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerForm: {
    flex:1,
    alignItems:'center'
  },
  form: {
    width: "100%",
    height: "auto" // para tomar o espaço que precisar
  },
  text: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10
  },
  loginContainer: {
    width: "100%",
  },
  containerIcon: {
    width: "1%",
    alignSelf: 'center'
  }, 
  appIconImage: {
    alignSelf: 'center',
    marginTop: 100
  }
});

export default styles;