import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import FavoritesScreen from './FavoritesScreen';
import CocktailDetailScreen from './CocktailDetailScreen';
import IngredientDetailScreen from './IngredientDetailScreen';
import { Pressable } from 'react-native';
import Ionicons from '../utils/Ionicons';
import { colors } from '../theme/colors';

export type FavoritesStackParams = {
  FavoritesList: undefined,
  CocktailDetail: { cocktailId: string, fromFavorites?: boolean },
  IngredientDetail: { ingredientName: string },
};

const optionsScreen = (
  screenProps: NativeStackScreenProps<FavoritesStackParams, keyof FavoritesStackParams>,
  titleScreen: string
) => {
  return {
    headerTintColor: 'orange',
    headerTitleStyle: { color: 'orange' },
    title: titleScreen,
    headerLeft: () => (
      <Pressable onPress={() => screenProps.navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="orange" />
      </Pressable>
    ),
  };
};

const Stack = createNativeStackNavigator<FavoritesStackParams>();

export const FavoritesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'FavoritesList'}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.third,
        },
        headerTitleStyle: {
          color: colors.txtBars,
          fontSize: 24,
        },
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="FavoritesList"
        component={FavoritesScreen}
        options={{ title: 'Favoritos' }}
      />
      <Stack.Screen
        name="CocktailDetail"
        component={CocktailDetailScreen}
        options={(props) => optionsScreen(props, 'Detalle del Cocktail')}
      />
      <Stack.Screen
        name="IngredientDetail"
        component={IngredientDetailScreen}
        options={(props) => optionsScreen(props, 'Detalle del Ingrediente')}
      />
    </Stack.Navigator>
  );
};
