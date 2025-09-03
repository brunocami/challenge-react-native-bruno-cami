import React, { useCallback, useEffect, useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { loadString } from '../utils/storage';
import { STORAGE_KEYS, VALID_EMAIL } from '../constants/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppTabParamList, RootStackParamList } from '../types/Tab';
import FeedScreen from '../screens/FeedScreen';
import ProductsScreen from '../screens/ProductsScreen';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type Route = 'Loading' | 'Login' | 'Main';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          // Elegir icono segun la vista
          const name = route.name === 'Feed' ? 'comment' : 'shopping-cart';

          return <MaterialIcons name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Productos" component={ProductsScreen} />
    </Tab.Navigator>
  );
}

function LoginScreenNav({ navigation }: any) {
  const onLoginSuccess = useCallback(() => {
    // Resetear stack en login success
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  }, [navigation]);
  return <LoginScreen onLoginSuccess={onLoginSuccess} />;
}

const AppNavigator: React.FC = () => {
  const [route, setRoute] = useState<Route>('Loading');

  // Verificar si el usuario esta autenticado al iniciar la aplicacion
  useEffect(() => {
    (async () => {
      // Simular peticion a la API
      await new Promise<void>(res => setTimeout(res, 2000));
      const storedUser = await loadString(STORAGE_KEYS.user);
      const { email } = JSON.parse(storedUser || '{}');
      const valid = email?.toLowerCase() === VALID_EMAIL;
      setRoute(valid ? 'Main' : 'Login');
    })();
  }, []);

  // Activity indicator mientras se verifica al usuario
  if (route === 'Loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={route}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Login" component={LoginScreenNav} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
