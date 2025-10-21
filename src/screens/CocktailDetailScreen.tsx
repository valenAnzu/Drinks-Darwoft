import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useCocktailService from "../services/useCocktailService";
import { Cocktail } from "../services/Cocktail";
import { homeStyles } from "./homeStyles";

interface Props extends NativeStackScreenProps<HomeStackParams, 'CocktailDetail'> { }

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
    

    return (
        <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#003e47' }}>
            {cocktailInfo.strDrinkThumb && (
                <Image
                    source={{ uri: cocktailInfo.strDrinkThumb }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            <Text style={homeStyles.textName}>{cocktailInfo.strDrink}</Text>

            <Text style={homeStyles.subtitle}>
                Category: <Text style={homeStyles.textInfo}>{cocktailInfo.strCategory}</Text>
            </Text>

            <Text style={homeStyles.subtitle}>
                Glass: <Text style={homeStyles.textInfo}>{cocktailInfo.strGlass}</Text>
            </Text>

            <Text style={homeStyles.subtitle}>
                Instructions: <Text style={homeStyles.textInfo}>{cocktailInfo.strInstructions}</Text>
            </Text>

            <Text style={homeStyles.subtitle}>Ingredients:</Text>
            {Array.from({ length: 15 }, (_, i) => i + 1).map(num => {
                const ingredientKey = `strIngredient${num}` as keyof Cocktail;
                const measureKey = `strMeasure${num}` as keyof Cocktail;

                const ingredient = cocktailInfo[ingredientKey];
                const measure = cocktailInfo[measureKey];

                if (!ingredient) return null;

                return (
                    <Text key={num} style={homeStyles.textInfo}>
                        {measure ? `${measure} ` : ''}{ingredient}
                    </Text>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
    },
});

export default CocktailDetailScreen;
