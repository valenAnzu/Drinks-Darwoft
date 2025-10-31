import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import { BottomTabParams } from "./homeTab";
import useCocktailService from "../services/useCocktailService";
import { Cocktail } from "../services/Cocktail";
import { homeStyles } from "./homeStyles";
import Divider from "../components/Divider";
import { YOUR_API_INGREDIENT_IMAGE } from "../constants/apis";
import { colors } from "../theme/colors";

interface Props extends NativeStackScreenProps<HomeStackParams, 'CocktailDetail'> {
}

const CocktailDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { cocktailId } = route.params;
    const { getOneCocktail, isLoading, errorMessage } = useCocktailService();
    const [cocktailInfo, setCocktailInfo] = useState<Cocktail | null>(null);

    const getCocktailDetail = async () => {
        try {
            const fetchedCocktail = await getOneCocktail(cocktailId);
            setCocktailInfo(fetchedCocktail);
        } catch (error) {
            console.error('Error loading cocktail detail', errorMessage);
        }
    };

    useEffect(() => {
        if (!cocktailId) {
            console.error('No se encontró id del trago. Regresando a la pantalla anterior.', errorMessage);
            navigation.goBack();
            return;
        }
        getCocktailDetail();
    }, [cocktailId]);

    if (isLoading) {
        return (
            <View style={homeStyles.loadingStyle}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!cocktailInfo) {
        return (
            <View style={homeStyles.screenContent}>
                <Text>No se encontró información para este trago.</Text>
            </View>
        );
    }
    
    const handleIngredientPress = (ingredientName: string) => {
        navigation.getParent<NativeStackNavigationProp<BottomTabParams>>().navigate('Ingredients', {
            screen: 'IngredientDetail',
            params: {
                ingredientName,
                fromScreen: 'CocktailDetail',
                cocktailId: cocktailInfo.idDrink,
            },
        });
    };

    return (
        <ScrollView style={homeStyles.screenContent}>
            {cocktailInfo.strDrinkThumb && (
                <Image
                    source={{ uri: cocktailInfo.strDrinkThumb }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <View style={{padding:20}}>
                <Text style={homeStyles.textName}>{cocktailInfo.strDrink}</Text>

                <Text style={homeStyles.subtitle}>
                    Category: <Text style={homeStyles.textInfo}>{cocktailInfo.strCategory}</Text>
                </Text>
                <Divider />

                <Text style={homeStyles.subtitle}>
                    Glass: <Text style={homeStyles.textInfo}>{cocktailInfo.strGlass}</Text>
                </Text>
                <Divider />

                <Text style={homeStyles.subtitle}>
                    Instructions: <Text style={homeStyles.textInfo}>{cocktailInfo.strInstructions}</Text>
                </Text>
                <Divider />

                <Text style={homeStyles.subtitle}>Ingredients:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginVertical: 10}}>
                        {Array.from({ length: 15 }, (_, i) => i + 1).map(num => {
                            const ingredientKey = `strIngredient${num}` as keyof Cocktail;
                            const measureKey = `strMeasure${num}` as keyof Cocktail;

                            const ingredient = cocktailInfo[ingredientKey];
                            const measure = cocktailInfo[measureKey];

                            if (!ingredient) return null;

                                return (
                                <TouchableOpacity key={num} style={styles.ingredientCard} onPress={() => handleIngredientPress(ingredient)}>
                                    <Image
                                        //no puedo reducir el uri porque la API los nombra con indices, y no hay un array listo.
                                        source={{ uri: `${YOUR_API_INGREDIENT_IMAGE}${ingredient}-Medium.png`}}
                                        style={styles.ingredientImage}
                                    />
                                    <Text style={styles.ingredientText}>{ingredient}</Text>
                                        {measure && <Text style={styles.measureText}>{measure}</Text>}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    ingredientCard: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.borderPrimary,
        borderRadius: 12,
        padding: 10,
        width: 130,
        height: 200,
    },
    ingredientImage: {
        width: 100,
        height: 100,
        borderRadius: 30,
        marginBottom: 6,
    },
    ingredientText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    measureText: {
        fontSize: 12,
        color: colors.txtInfo,
        textAlign: 'center',
    },
});

export default CocktailDetailScreen;
