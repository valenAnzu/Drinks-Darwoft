import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { IngredientsStackParams } from "./ingredientsStack";
import useIngredientService, { Ingredient } from "../services/useIngredientService";
import { homeStyles } from "./homeStyles";
import Pagination from "../components/Pagination";

const screenWidth = Dimensions.get('window').width;

type IngredientsScreenNavigationProp = NativeStackNavigationProp<IngredientsStackParams>;

const IngredientsScreen: React.FC = () => {
    const navigation = useNavigation<IngredientsScreenNavigationProp>();
    const { getIngredients, isLoading } = useIngredientService();
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ itemsPerPage ] = useState(10);

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

    const totalPages = Math.ceil(ingredients.length / itemsPerPage);

    const paginatedIngredients = ingredients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        }
    };

    const IngredientSize = {
        Small: 'Small',
        Medium: 'Medium',
        Large: 'Large',
    } as const;

    type IngredientImageSize = typeof IngredientSize[keyof typeof IngredientSize];


    const getIngredientImageUrl = (ingredientName: string, size: IngredientImageSize = IngredientSize.Medium) =>
        `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ingredientName)}-${size}.png`;

    const renderItem = ({ item, index }: { item: Ingredient; index: number }) => (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("IngredientDetail", {
                ingredientName: item.strIngredient1,
            })}
        >
            <Image 
                source={{ uri: getIngredientImageUrl(item.strIngredient1) }}
                style={styles.image} />
            <Text style={styles.imageText}>{item.strIngredient1}</Text>
        </Pressable>
    )

    return (
        <View style={homeStyles.screenContent}>
            <FlatList
                numColumns={2}
                data={paginatedIngredients}
                keyExtractor={(item, index) => item.strIngredient1 + index}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10 }} /> // separador vertical de 10px
                )}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        No se encontraron ingredientes que coincidan.
                    </Text>
                )}
            />
            {/* Paginación */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
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
        alignItems: 'center',
        justifyContent: 'center',
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
