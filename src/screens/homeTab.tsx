import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeStack } from './homeStack';
import { IngredientsStack } from './ingredientsStack';
import Ionicons from '../Ionicons';
import FavoritesScreen from './FavoritesScreen';

export type BottomTabParams = {
    Cocktails: undefined,
    Ingredients: undefined,
    Favorites: undefined,
}

const Tab = createBottomTabNavigator<BottomTabParams>();

const HomeTab = () => {

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#00333b' }}
      edges={['left', 'right']}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#ff7b00',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: '#00333b',
            },

            tabBarIcon: ({ color, size }) => {
                let iconName = '';

                switch (route.name) {
                    case 'Cocktails':
                        iconName = 'list-outline'; // icono de copa/botella
                        break;
                    case 'Ingredients':
                        iconName = 'wine-outline'; // icono de lista de tres líneas
                        break;
                    case 'Favorites':
                        iconName = 'heart-outline'; // icono de corazón
                        break;
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
      >
        <Tab.Screen
            name="Cocktails"
            component={HomeStack}
            options={{ title: 'Cocktails' }}
        />
        <Tab.Screen
            name="Ingredients"
            component={IngredientsStack}
            options={{ title: 'Ingredients' }}
        />
        <Tab.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ title: 'Favorites' }}
        />
      </Tab.Navigator>

    </SafeAreaView>
  )
}

export default HomeTab;