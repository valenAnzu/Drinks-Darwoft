import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import IngredientsScreen from './IngredientsScreen';

export type IngredientsStackParams = {
  Ingredients: undefined;
}

const Stack = createNativeStackNavigator<IngredientsStackParams>();

export const IngredientsStack = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'gray' }}>
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
      </Stack.Navigator>
    </SafeAreaView>
  );
}
