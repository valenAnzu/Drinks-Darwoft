import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import IngredientsScreen from './IngredientsScreen';
import IngredientDetailScreen from './IngredientDetailScreen';
import { Pressable } from 'react-native';
import Ionicons from '../utils/Ionicons';
import { colors } from '../theme/colors';

export type IngredientsStackParams = {
  IngredientsList: undefined;
  IngredientDetail: {
    ingredientName: string,
    fromScreen?: 'CocktailDetail' | 'IngredientList',
    cocktailId?: string,
  };
}

const optionsScreen = (
  screenProps: NativeStackScreenProps<IngredientsStackParams, keyof IngredientsStackParams>,
  titleScreen: string,
  headerRightDestinationTitle?: string
) => {
  const destination = headerRightDestinationTitle ? headerRightDestinationTitle : 'IngredientsList';
  let options: any = {
    headerTintColor: colors.txtBars,
    headerTitleStyle: { color: colors.txtBars },
    title: titleScreen,
    headerLeft: () => (
      <Pressable onPress={() => screenProps.navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={colors.txtBars} />
      </Pressable>
    ),
  };
  if (headerRightDestinationTitle) {
    options = {
      ...options,
      headerRight: () => (
        <Pressable onPress={() => screenProps.navigation.navigate(destination as any)}>
          <Ionicons name="menu" size={24} color={colors.txtBars} />
        </Pressable>
      ),
    };
  }
  return options;
}


const Stack = createNativeStackNavigator<IngredientsStackParams>();

export const IngredientsStack = () => {
  return (
      <Stack.Navigator
        initialRouteName={'IngredientsList'}
        screenOptions={{
          headerShown: true,
          headerTintColor: colors.txtBars,
          headerStyle: {
            backgroundColor: colors.third,
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
          options={(props) => optionsScreen(
            props,
            'Ingredient Detail',
            'IngredientsList')
          }

        />

      </Stack.Navigator>
  );
}
