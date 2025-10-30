import { Dimensions, StyleSheet } from "react-native";


const screenWidth = Dimensions.get('window').width;

const CARD_MARGIN = 10;
const CARD_WIDTH = (screenWidth / 2) - CARD_MARGIN * 3;

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
    cardContainer: {
        position: "relative",
    },
    favoriteButton: {
        position: "absolute",
        top: 8,
        right: 15,
        padding: 6,
        borderRadius: 20,
    },
    card: {
        width: CARD_WIDTH,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        overflow: 'hidden',
        backgroundColor: '#003e47',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    imageText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});