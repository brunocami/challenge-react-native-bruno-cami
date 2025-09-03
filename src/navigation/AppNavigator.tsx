import React, { useCallback, useEffect, useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import { ActivityIndicator, Button, View, StyleSheet } from 'react-native';
import { loadString, removeKey } from '../utils/storage';
import { STORAGE_KEYS, VALID_EMAIL } from '../constants/auth';

type Route = 'loading' | 'login' | 'main';

const AppNavigator: React.FC = () => {
  const [route, setRoute] = useState<Route>('loading');

  // Verificar si el usuario esta autenticado al iniciar la aplicacion
  useEffect(() => {
    (async () => {
      // Simular peticion a la API
      await new Promise<void>(res => setTimeout(res, 2000));
      const storedUser = await loadString(STORAGE_KEYS.user);
      const { email } = JSON.parse(storedUser || '{}');
      const valid = email?.toLowerCase() === VALID_EMAIL;
      setRoute(valid ? 'main' : 'login');
    })();
  }, []);

  const handleLoggedIn = useCallback(() => {
    setRoute('main');
  }, []);

  // Activity indicator mientras se verifica al usuario
  if (route === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (route === 'login') return <LoginScreen onLoginSuccess={handleLoggedIn} />;
  return (
    <View style={styles.centered}>
      <Button
        title="Cerrar sesión"
        onPress={async () => {
          await removeKey(STORAGE_KEYS.user);
          setRoute('login');
        }}
      />
    </View>
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
