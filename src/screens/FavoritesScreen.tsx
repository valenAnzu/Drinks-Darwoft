import React from "react";
import { View, Text, FlatList, Image, Pressable, StyleSheet } from "react-native";
import { useFavorites } from "../contexts/FavoritesContext";
import { Cocktail } from "../services/Cocktail";
import Ionicons from "../utils/Ionicons";
import { homeStyles } from "./homeStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FavoritesStackParams } from "./FavoritesStack";

interface Props extends NativeStackScreenProps<FavoritesStackParams, 'FavoritesList'>{ };

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const renderItem = ({ item }: { item: Cocktail }) => {
    const fav = isFavorite(item.idDrink);
    return (
      <View style={homeStyles.cardContainer}>
      <Pressable
        style={homeStyles.card}
        onPress={() => navigation.navigate('CocktailDetail', { cocktailId: item.idDrink, fromFavorites: true })}
      >
        <Image source={{ uri: item.strDrinkThumb }} style={homeStyles.image} />
        <View style={homeStyles.overlay}>
          <Text style={homeStyles.imageText}>{item.strDrink}</Text>
        </View>
      </Pressable>

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
    )
  };

  if (favorites.length === 0) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>No hay favoritos aún.</Text>;
  }

  return (
    <View style={homeStyles.screenContent}>
      <FlatList
        numColumns={2}
        data={favorites}
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
  );
};


export default FavoritesScreen;
