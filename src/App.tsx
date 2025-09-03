import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <AuthProvider>
                    <AppNavigator />
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
