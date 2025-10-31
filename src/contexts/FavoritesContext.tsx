import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cocktail } from "../services/Cocktail";

interface FavoritesContextType {
  //valores y funciones disponibles para cualquier componente que use el contexto
  favorites: Cocktail[];
  toggleFavorite: (cocktail: Cocktail) => void; //agrega o quita coctel de fav
  isFavorite: (idDrink: string) => boolean; 
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

//envuelve a la app y provee acceso al contexto
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Cocktail[]>([]);

  // cargar desde almacenamiento local los favoritos guardados
  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem("favorites");
      if (stored) setFavorites(JSON.parse(stored)); //si hay algo guardado, lo convierte de json a objeto y lo pone en el estado favorites
    };
    loadFavorites();
  }, []);

  const saveFavorites = async (data: Cocktail[]) => {
    setFavorites(data);
    await AsyncStorage.setItem("favorites", JSON.stringify(data));
  };

  const toggleFavorite = (cocktail: Cocktail) => {
    const exists = favorites.some(f => f.idDrink === cocktail.idDrink);
    if (exists) {
      const updated = favorites.filter(f => f.idDrink !== cocktail.idDrink);
      saveFavorites(updated);
    } else {
      saveFavorites([...favorites, cocktail]);
    }
  };

  const isFavorite = (idDrink: string) => favorites.some(f => f.idDrink === idDrink);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext); //hook que permite utilizar el contexto
