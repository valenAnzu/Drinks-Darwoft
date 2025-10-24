import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useCocktailService from "../services/useCocktailService";
import { Cocktail } from "../services/Cocktail";
import { homeStyles } from "./homeStyles";
import Divider from "../components/Divider";
import { IngredientsStackParams } from "./ingredientsStack";

interface Props extends NativeStackScreenProps<IngredientsStackParams, 'CocktailsByIngredient'> { }

const CocktailsByIngredientScreen: React.FC<Props> = ({ navigation, route }) => {

    return (
        <Text>Hola tragos por ingredientes</Text>
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
        marginRight: 12,
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 10,
        width: 100,
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
        color: '#d3d3d3',
        textAlign: 'center',
    },
});

export default CocktailsByIngredientScreen;
