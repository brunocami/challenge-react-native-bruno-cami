import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    useColorScheme,
    TouchableOpacity,
} from 'react-native';
import { getColors } from '../constants/colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Tab';

interface CustomHeaderProps {
    title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    const { signOut } = useAuth();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            {title === 'Feed' ? (
                <View style={styles.logoutContainer}>
                    <View style={styles.commentsCountContainer}>
                        <Text style={[styles.title, { color: colors.text }]}>
                            Comentarios
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={async () => {
                            await signOut();
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                        }}
                    >
                        <MaterialIcons
                            name="logout"
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={[styles.title, { color: colors.text }]}>
                    {title}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 16,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    logoutContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commentsCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomHeader;
