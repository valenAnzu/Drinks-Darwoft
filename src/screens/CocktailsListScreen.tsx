import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useCocktailService from "../services/useCocktailService";
import { useFavorites } from "../contexts/FavoritesContext";
import { Cocktail } from "../services/Cocktail";
import { homeStyles } from "./homeStyles";
import Pagination from "../components/Pagination";
import Ionicons from "../utils/Ionicons";
//import HeaderFilter from "../components/HeaderFilter";

interface Props extends NativeStackScreenProps<HomeStackParams, 'CocktailsList'>{ };

const screenWidth = Dimensions.get('window').width;

const CocktailsListScreen: React.FC<Props> = ({ navigation }) => {
    const { getCocktails, isLoading } = useCocktailService();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ itemsPerPage ] = useState(20);

    const getAllCocktails = async () => {
        const fetchedCocktails = await getCocktails();
        setCocktails(fetchedCocktails);
    }

    useEffect(() => {
        getAllCocktails();
    }, [])

    if (isLoading) {
        return (
            <View style={homeStyles.loadingStyle}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    const totalPages = Math.ceil(cocktails.length / itemsPerPage);

    const paginatedCocktails = cocktails.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        }
    };

    const renderItem = ({ item }: { item: Cocktail }) => {
        const fav = isFavorite(item.idDrink);

        return (
            <View style={homeStyles.cardContainer}>
            <Pressable
                style={styles.card}
                onPress={() => navigation.navigate('CocktailDetail', { cocktailId: item.idDrink })}
            >
                <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
                <View style={styles.overlay}>
                    <Text style={styles.imageText}>{item.strDrink}</Text>
                </View>
            </Pressable>

            {/* Botón de favorito */}
            <Pressable
                style={homeStyles.favoriteButton}
                onPress={() => toggleFavorite(item)}
                
            >
                <View style={{position: 'relative'}}>
                    <Ionicons name="heart-outline" size={24} color="white" />

                    {fav && (
                        <Ionicons
                            name="heart"
                            size={24}
                            color="white"
                            style={{position: 'absolute', top: 0, left: 0}}
                        />
                    )}
                </View>
            </Pressable>
            </View>
        );
    };


    return (
        <View style={homeStyles.screenContent}>
            <FlatList
                numColumns={2}
                data={paginatedCocktails}
                keyExtractor={(item) => item.idDrink}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10 }} /> // separador vertical de 10px
                )}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        No se encontraron tragos que coincidan.
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
}

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

export default CocktailsListScreen;
