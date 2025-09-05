// Header personalizados para cada tab
const FeedHeader = () => <CustomHeader title="Feed" />;
const ProductosHeader = () => <CustomHeader title="Productos" />;
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    useColorScheme,
    Image,
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

import CustomHeader from '../components/CustomHeader';
import { Text } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function getTabBarIcon(routeName: string) {
    return ({ color, size }: { color: string; size: number }) => {
        const name = routeName === 'Feed' ? 'comment' : 'shopping-cart';
        return <MaterialIcons name={name} size={size} color={color} />;
    };
}

function TabNavigator() {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: getTabBarIcon(route.name),
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: colors.background,
                    height: 60,
                },
            })}
        >
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{ header: FeedHeader }}
            />
            <Tab.Screen
                name="Productos"
                component={ProductsScreen}
                options={{ header: ProductosHeader }}
            />
        </Tab.Navigator>
    );
}

const AppNavigator: React.FC = () => {
    const { status } = useAuth();

    // Activity indicator mientras se verifica al usuario
    if (status === 'loading') {
        return (
            <View style={styles.centered}>
                <Image
                    source={require('../assets/images/icon.png')}
                    style={{ width: 100, height: 100 }}
                    resizeMode="contain"
                />
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
