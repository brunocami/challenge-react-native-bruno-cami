import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
    Feed: undefined;
    Login: undefined;
};

export default function FeedScreen() {
    const { signOut } = useAuth();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <View>
            <Text>FeedScreen</Text>
            <Button
                title="Cerrar sesión"
                onPress={async () => {
                    await signOut();
                    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
            />
        </View>
    );
}
