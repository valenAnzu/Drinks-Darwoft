import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './homeStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '../Ionicons';

import IngredientsScreen from './IngredientsScreen';
import FavoritesScreen from './FavoritesScreen';

export type BottomTabParams = {
    Cocktails: undefined,
    Ingredients: undefined,
    Favorites: undefined,
}

const Tab = createBottomTabNavigator<BottomTabParams>();

const HomeTab = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#ff7b00',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#00333b',
                    paddingBottom: insets.bottom, // ajusta automáticamente
                    height: 60 + insets.bottom,
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
                component={IngredientsScreen}
                options={{ title: 'Ingredients' }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{ title: 'Favorites' }}
            />
        </Tab.Navigator>
    )
}

export default HomeTab;