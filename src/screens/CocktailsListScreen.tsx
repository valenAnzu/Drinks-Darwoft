import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Pressable, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParams } from "./homeStack";
import useCocktailService from "../services/useCocktailService";
import { Cocktail } from "../services/Cocktail";
import { homeStyles } from "./homeStyles";
//import HeaderFilter from "../components/HeaderFilter";

interface Props extends NativeStackScreenProps<HomeStackParams, 'CocktailsList'>{ };

const screenWidth = Dimensions.get('window').width;

const CocktailsListScreen: React.FC<Props> = ({ navigation }) => {
    const { getCocktails, isLoading } = useCocktailService();
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);

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

    const renderItem = ({ item }: { item: Cocktail }) => (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('CocktailDetail', { cocktailId: item.idDrink })}
        >
            <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
            <Text style={homeStyles.textName}>{item.strDrink}</Text>
        </Pressable>
    )

    return (
        <View style={homeStyles.screenContent}>
            <FlatList
                numColumns={2}
                data={cocktails}
                keyExtractor={(item) => item.idDrink}
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
}

const CARD_MARGIN = 10;
const CARD_WIDTH = (screenWidth / 2) - CARD_MARGIN * 3;

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#a1ecff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
});

export default CocktailsListScreen;
