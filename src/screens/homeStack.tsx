import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CocktailsListScreen from './CocktailsListScreen'


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
  const navigation = useNavigation<HomeStackNavigationProp>();  // TODO: Remover elementos que no se usan

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'gray' }}>
      <Stack.Navigator
        initialRouteName={'CocktailsList'}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#86f6ff',
          },
          headerTitleStyle: {
            color: 'black',
          },
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="CocktailsList" component={CocktailsListScreen} options={{ title: 'Cocktails List' }} />
       
      </Stack.Navigator>
    </SafeAreaView>
  );
}