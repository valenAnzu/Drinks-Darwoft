import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useIngredientService, { Ingredient } from "../services/useIngredientService";
import { Cocktail } from "../services/Cocktail";
import { homeStyles } from "./homeStyles";
import Divider from "../components/Divider";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;

const IngredientsScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    const { getIngredients, isLoading } = useIngredientService();
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const getAllIngredients = async () => {
        const fetchedIngredients = await getIngredients();
        setIngredients(fetchedIngredients);
    }

    useEffect(() => {
        getAllIngredients();
    }, [])

    if (isLoading) {
        return (
            <View style={homeStyles.loadingStyle}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    const renderItem = ({ item, index }: { item: Ingredient; index: number }) => (
        
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('CocktailsByIngredient', { ingredientName: item.strIngredient1 })}
        >
            <Text style={styles.imageText}>{item.strIngredient1}</Text>
        </Pressable>
      
    )

    return (
        <View style={homeStyles.screenContent}>
            <FlatList
                numColumns={2}
                data={ingredients}
                keyExtractor={(item, index) => item.strIngredient1 + index}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10 }} /> // separador vertical de 10px
                )}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        No se encontraron razas que coincidan.
                    </Text>
                )}
            />
        </View>
    )
};

const CARD_MARGIN = 10;
const CARD_WIDTH = (screenWidth / 2) - CARD_MARGIN * 3;

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        overflow: 'hidden',
        backgroundColor: '#003e47',
        elevation: 0,
        shadowOpacity: 0,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
        backgroundColor: '#003e47'
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)', // semitransparente para destacar el texto
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    imageText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default IngredientsScreen;
