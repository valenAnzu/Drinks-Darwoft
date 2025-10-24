import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IngredientsScreen from './IngredientsScreen';
import CocktailsByIngredientScreen from './CocktailsByIngredientScreen';

export type IngredientsStackParams = {
  Ingredients: undefined;
  CocktailsByIngredient: { ingredientName: string };
}


const Stack = createNativeStackNavigator<IngredientsStackParams>();

export const IngredientsStack = () => {
  return (
      <Stack.Navigator
        initialRouteName={'Ingredients'}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#00333b',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 24,
          },
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Ingredients" component={IngredientsScreen} options={{ title: 'Ingredients' }} />
        <Stack.Screen name="CocktailsByIngredient" component={CocktailsByIngredientScreen} options={{ title: 'Cocktail By Ingredient' }} />

      </Stack.Navigator>
  );
}
