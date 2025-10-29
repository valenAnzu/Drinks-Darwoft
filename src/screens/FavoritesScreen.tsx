import React from "react";
import { View, Text, FlatList, Image, Pressable, StyleSheet } from "react-native";
import { useFavorites } from "../contexts/FavoritesContext";
import { Cocktail } from "../services/Cocktail";

const FavoritesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { favorites } = useFavorites();

  const renderItem = ({ item }: { item: Cocktail }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('CocktailDetail', { cocktailId: item.idDrink })}
    >
      <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.imageText}>{item.strDrink}</Text>
      </View>
    </Pressable>
  );

  if (favorites.length === 0) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>No hay favoritos aún.</Text>;
  }

  return (
    <FlatList
      numColumns={2}
      data={favorites}
      keyExtractor={(item) => item.idDrink}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#003e47",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  imageText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FavoritesScreen;
