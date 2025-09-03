import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { STORAGE_KEYS } from '../constants/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../services/auth';

type Props = { onLoginSuccess?: () => void };

const LoginScreen: React.FC<Props> = ({ onLoginSuccess }) => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    const res = await login(user);
    if (res?.code === 200) {
      // Guardar usuario en AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
      onLoginSuccess?.();
      return;
    }
    if (res?.code === 404) {
      Alert.alert('Usuario incorrecto', 'Revisá el email y la contraseña.');
      return;
    }
    Alert.alert('Error', 'Ocurrió un error inesperado.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={user.email}
        onChangeText={email => setUser(prev => ({ ...prev, email }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={user.password}
        onChangeText={password => setUser(prev => ({ ...prev, password }))}
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
