import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  screenContent: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#003e47'
  },
  textName: {
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 8,
      color: 'white'
    },
    subtitle: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    textInfo: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: 'normal',
      color: '#d3d3d3',
    },
    loadingStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

});