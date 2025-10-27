import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

import useIngredientService, { Ingredient } from "../services/useIngredientService";
import useCocktailService from "../services/useCocktailService";
import { Cocktail } from "../services/Cocktail";
import { homeStyles } from "./homeStyles";
import { IngredientsStackParams } from "./ingredientsStack";
import { BottomTabParams } from "./homeTab";

const screenWidth = Dimensions.get('window').width;

interface Props extends NativeStackScreenProps<IngredientsStackParams, 'IngredientDetail'> { }

const IngredientDetailScreen: React.FC<Props> = ({ navigation, route }) => {
    const { ingredientName } = route.params;
    const { getOneIngredient } = useIngredientService();
    const { getCocktailsByIngredient, isLoading, errorMessage } = useCocktailService();
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);

    const getIngredientDetail = async () => {
        try {
            await getOneIngredient(ingredientName);
            const fetchedCocktails = await getCocktailsByIngredient(ingredientName);
            setCocktails(fetchedCocktails);
        } catch (error) {
            console.error('Error loading ingredient detail', errorMessage);
        }
    };

    useEffect(() => {
        const parent = navigation.getParent();
        parent?.setOptions({ tabBarStyle: {display: 'flex' } });
        if (!ingredientName) {
            console.error('No se encontró nombre del ingrediente. Regresando a la pantalla anterior.');
            navigation.goBack();
            return;
        }
        getIngredientDetail();
    }, [ingredientName]);

    if (isLoading) {
        return (
            <View style={homeStyles.loadingStyle}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const getIngredientImageUrl = (ingredientName: string) =>
        `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ingredientName)}-Medium.png`;

    const renderItem = ({ item }: { item: Cocktail }) => (
        <View style={styles.card}>
            <Image 
                source={{ uri: item.strDrinkThumb }} 
                style={styles.image} 
            />
            <Text style={styles.cocktailName}>{item.strDrink}</Text>
        </View>
    );

    return (
        <ScrollView style={homeStyles.screenContent}>
            <Pressable
                style={{ padding: 10, margin: 10, backgroundColor: '#ff7b00', borderRadius: 8 }}
                onPress={() => {
                    if (route.params.fromScreen === 'CocktailDetail' && route.params.cocktailId) {
                        // Vuelve al detalle del cocktail
                        navigation.getParent<NativeStackNavigationProp<BottomTabParams>>()?.navigate('Cocktails', {
                            screen: 'CocktailDetail',
                            params: { cocktailId: route.params.cocktailId }, // tenés que pasar el cocktailId desde el detalle de cocktail
                        });
                    } else {
                        // Vuelve al listado de ingredientes
                        navigation.goBack();
                    }
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Volver</Text>
            </Pressable>

            <View style={styles.ingredientHeader}>
                <Image 
                    source={{ uri: getIngredientImageUrl(ingredientName) }} 
                    style={styles.ingredientImage} 
                />
                <Text style={styles.ingredientTitle}>{ingredientName}</Text>

                <Text style={styles.ingredientSubtitle}>
                    {cocktails.length} cockteles disponibles
                </Text>
            </View>
            
            <FlatList
                numColumns={2}
                data={cocktails}
                scrollEnabled={false}
                keyExtractor={(item, index) => item.idDrink + index}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>
                        No se encontraron tragos con este ingrediente.
                    </Text>
                )}
            />
        </ScrollView>
    );
};

const CARD_MARGIN = 10;
const CARD_WIDTH = (screenWidth / 2) - CARD_MARGIN * 3;

const styles = StyleSheet.create({
    ingredientHeader: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#003e47',
        borderRadius: 12,
        margin: 10,
    },
    ingredientImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    ingredientTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 5,
    },
    ingredientDescription: {
        fontSize: 14,
        color: '#d3d3d3',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        lineHeight: 20,
    },
    ingredientABV: {
        fontSize: 14,
        color: '#ff7b00',
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 5,
    },
    ingredientSubtitle: {
        fontSize: 16,
        color: '#d3d3d3',
        textAlign: 'center',
    },
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
    cocktailName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 8,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'white',
        fontSize: 16,
    },
});

export default IngredientDetailScreen;
