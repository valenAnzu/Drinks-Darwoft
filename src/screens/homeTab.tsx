import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeStack, HomeStackParams } from './homeStack';
import { IngredientsStack, IngredientsStackParams } from './ingredientsStack';
import { FavoritesStack, FavoritesStackParams } from './FavoritesStack';
import { NavigatorScreenParams } from '@react-navigation/native';
import Ionicons from '../utils/Ionicons';
import { View } from 'react-native';
import { colors } from '../theme/colors';

export type BottomTabParams = {
  Cocktails: NavigatorScreenParams<HomeStackParams>,
  Ingredients: NavigatorScreenParams<IngredientsStackParams>,
  Favorites: NavigatorScreenParams<FavoritesStackParams>,
}

const Tab = createBottomTabNavigator<BottomTabParams>();

const HomeTab = () => {

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.third }}
      edges={['left', 'right']}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.txtBars,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                // marginBottom: 8,
                backgroundColor: colors.third
            },
            tabBarBackground: () => (
                <View style={{ flex: 1, backgroundColor: colors.third }} />
            ),
              // <View style={{ flex: 1, backgroundColor: colors.third }} />
              // <View style={{ backgroundColor: 'red' }} />
            // ),

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
            component={FavoritesStack}
            options={{ title: 'Favorites' }}
        />
      </Tab.Navigator>

    </SafeAreaView>
  )
}

export default HomeTab;