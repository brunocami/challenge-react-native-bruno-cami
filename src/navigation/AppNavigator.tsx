import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    useColorScheme,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppTabParamList, RootStackParamList } from '../types/Tab';
import FeedScreen from '../screens/FeedScreen';
import ProductsScreen from '../screens/ProductsScreen';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useAuth } from '../context/AuthContext';
import CheckoutScreen from '../screens/Checkout';
import { getColors } from '../constants/colors';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function TabNavigator() {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    // Cambiar icono segun la vista
                    const name =
                        route.name === 'Feed' ? 'comment' : 'shopping-cart';

                    return (
                        <MaterialIcons name={name} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: colors.background,
                    height: 60,
                },
            })}
        >
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Productos" component={ProductsScreen} />
        </Tab.Navigator>
    );
}

const AppNavigator: React.FC = () => {
    const { status } = useAuth();

    // Activity indicator mientras se verifica al usuario
    if (status === 'loading') {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName={status === 'auth' ? 'Main' : 'Login'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
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
