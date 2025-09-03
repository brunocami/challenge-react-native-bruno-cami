import React from 'react';
import { Button, Text, View } from 'react-native';
import { removeKey } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/auth';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Feed: undefined;
  Login: undefined;
};

export default function FeedScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>FeedScreen</Text>
      <Button
        title="Cerrar sesión"
        onPress={async () => {
          await removeKey(STORAGE_KEYS.user);
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }}
      />
    </View>
  );
}
