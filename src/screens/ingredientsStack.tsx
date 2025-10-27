import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IngredientsScreen from './IngredientsScreen';
import IngredientDetailScreen from './IngredientDetailScreen';
import { Pressable, Text } from 'react-native';

export type IngredientsStackParams = {
  IngredientsList: undefined;
  IngredientDetail: {
    ingredientName: string,
    fromScreen?: 'CocktailDetail' | 'IngredientList',
    cocktailId?: string,
  };
}


const Stack = createNativeStackNavigator<IngredientsStackParams>();

export const IngredientsStack = () => {
  return (
      <Stack.Navigator
        initialRouteName={'IngredientsList'}
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
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen
          name="IngredientsList"
          component={IngredientsScreen}
          options={{ title: 'Ingredients' }}
        />
        <Stack.Screen 
          name="IngredientDetail" 
          component={IngredientDetailScreen} 
          options={() => ({ title: 'Ingredient Detail' })} 
        />

      </Stack.Navigator>
  );
}
