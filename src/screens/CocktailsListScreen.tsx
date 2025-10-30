import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from '@react-navigation/native';
import { HomeStackParams } from "./homeStack";
import useCocktailService from "../services/useCocktailService";
import { useFavorites } from "../contexts/FavoritesContext";
import { Cocktail } from "../services/Cocktail";
import { homeStyles } from "./homeStyles";
import Ionicons from "../utils/Ionicons";
import HeaderTitle from "../components/HeaderTitle";

interface Props extends NativeStackScreenProps<HomeStackParams, 'CocktailsList'>{ };

const screenWidth = Dimensions.get('window').width;

const CocktailsListScreen: React.FC<Props> = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { getCocktails, isLoading } = useCocktailService();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [ actualFilter, setActualFilter ] = useState("");
    const [ filteredCocktails, setFilteredcocktails ] = useState<Cocktail[]>([]);

    const getAllCocktails = async () => {
        const fetchedCocktails = await getCocktails();
        setCocktails(fetchedCocktails);
    }

    useEffect(() => {
        getAllCocktails();
    }, [])

    useEffect(() => {
        if (actualFilter.trim() === "") {
            setFilteredcocktails(cocktails);
        } else {
            const filtered = cocktails.filter((cocktail) =>
                cocktail.strDrink.toLowerCase().includes(actualFilter.toLowerCase())
            );
            setFilteredcocktails(filtered);
        }
    }, [actualFilter, cocktails]);

    const refreshHeader = () => {
        navigation.setOptions({
            // Se reemplaza el título por un componente de filtro
            headerTitle: () => (
                <HeaderTitle
                    actualFilter={actualFilter}
                    onFilterChange={setActualFilter}
                />
            ),
            headerTitleAlign: 'center',
        });
    }

    useEffect(() => {
        if (isFocused) {
           refreshHeader()
        }

    }, [isFocused])

    

    if (isLoading) {
        return (
            <View style={homeStyles.loadingStyle}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Cocktail }) => {
        const fav = isFavorite(item.idDrink);

        return (
            <View style={homeStyles.cardContainer}>
            <Pressable
                style={homeStyles.card}
                onPress={() => navigation.navigate('CocktailDetail', { cocktailId: item.idDrink })}
            >
                <Image source={{ uri: item.strDrinkThumb }} style={homeStyles.image} />
                <View style={homeStyles.overlay}>
                    <Text style={homeStyles.imageText}>{item.strDrink}</Text>
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
                data={filteredCocktails}
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
        </View>                     
    )
}

export default CocktailsListScreen;
