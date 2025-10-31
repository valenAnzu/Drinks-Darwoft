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
                backgroundColor: colors.third
            },
            tabBarBackground: () => (
                <View style={{ flex: 1, backgroundColor: colors.third }} />
            ),

            tabBarIcon: ({ color, size }) => {
                let iconName = '';

                switch (route.name) {
                    case 'Cocktails':
                        iconName = 'wine-outline';
                        break;
                    case 'Ingredients':
                        iconName = 'list-outline';
                        break;
                    case 'Favorites':
                        iconName = 'heart-outline';
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