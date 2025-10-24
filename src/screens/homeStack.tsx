import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CocktailsListScreen from './CocktailsListScreen';
import CocktailDetailScreen from './CocktailDetailScreen';

export type HomeStackParams = {
  CocktailsList: undefined,
  CocktailDetail: { cocktailId: string },
}

export type HomeStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParams>,
  NavigationProp<HomeStackParams>
>;

const Stack = createNativeStackNavigator<HomeStackParams>();

export const HomeStack = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'gray' }}>
      <Stack.Navigator
        initialRouteName={'CocktailsList'}
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
        <Stack.Screen name="CocktailsList" component={CocktailsListScreen} options={{ title: 'Cocktails List' }} />
        <Stack.Screen name="CocktailDetail" component={CocktailDetailScreen} options={{ title: 'Cocktail Detail' }} />

      </Stack.Navigator>
    </SafeAreaView>
  );
}