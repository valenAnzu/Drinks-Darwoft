import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeNavigationProp, NavigationProp } from '@react-navigation/native';

import CocktailsListScreen from './CocktailsListScreen';
import CocktailDetailScreen from './CocktailDetailScreen';
import { Pressable } from 'react-native';
import Ionicons from '../utils/Ionicons';
import { colors } from '../theme/colors';

export type HomeStackParams = {
  CocktailsList: undefined,
  CocktailDetail: { cocktailId: string, fromFavorites?: boolean },
}

export type HomeStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParams>,
  NavigationProp<HomeStackParams>
>;

const optionsScreen = (
  screenProps: NativeStackScreenProps<HomeStackParams, keyof HomeStackParams>,
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

const Stack = createNativeStackNavigator<HomeStackParams>();

export const HomeStack = () => {
  return (
      <Stack.Navigator
        initialRouteName={'CocktailsList'}
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
        <Stack.Screen name="CocktailsList" component={CocktailsListScreen} options={{ title: 'Cocktails List' }} />
        <Stack.Screen name="CocktailDetail" component={CocktailDetailScreen} options={(props) => optionsScreen(
            props,
            'Cocktail Detail',
            'CocktailsList')
          }
        />

      </Stack.Navigator>
  );
}