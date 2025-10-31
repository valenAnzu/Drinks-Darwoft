import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from './FavoritesScreen';
import { colors } from '../theme/colors';

export type FavoritesStackParams = {
  FavoritesList: undefined,
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
        headerTintColor: colors.txtBars,
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
    </Stack.Navigator>
  );
};
