import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    useColorScheme,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Tab';
import { getColors } from '../constants/colors';

const LoginScreen = () => {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { signIn } = useAuth();
    const [user, setUser] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });

    const handleLogin = async () => {
        try {
            await signIn(user.email, user.password);
            navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        } catch (error) {}
    };

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <Text style={[styles.title, { color: colors.text }]}>
                Iniciar sesión
            </Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        color: colors.text,
                    },
                ]}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={user.email}
                onChangeText={email => setUser(prev => ({ ...prev, email }))}
            />
            <TextInput
                style={[
                    styles.input,
                    {
                        color: colors.text,
                    },
                ]}
                placeholder="Contraseña"
                secureTextEntry
                value={user.password}
                onChangeText={password =>
                    setUser(prev => ({ ...prev, password }))
                }
            />
            <Button title="Ingresar" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
});

export default LoginScreen;
