import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { HomeStack, HomeStackParams } from './homeStack';


// Define el tipo para los parámetros del stack raíz de forma más específica
// Cada propiedad representa una ruta y sus parámetros
export type RootStackParams = {
  // Para anidación mejorada, podemos importar y usar los tipos de parámetros de cada stack
  AuthStack: undefined, // O puedes usar NavigatorScreenParams<AuthStackParams> para mejor tipado
  HomeStack: NavigatorScreenParams<HomeStackParams>, // O puedes usar NavigatorScreenParams<HomeStackParams> para mejor tipado
}

// Crear el navegador con el tipo apropiado
const Stack = createNativeStackNavigator<RootStackParams>();

export const RootStack = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined} // Necesario para cumplir con la definición de tipos en React Navigation 7
        initialRouteName={'HomeStack'}
        screenOptions={{
          headerShown: false,
        //   contentStyle: { backgroundColor: 'red' },  // TODO: Remover codigo comentado
        }}
      >
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
