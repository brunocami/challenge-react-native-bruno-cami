import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { getColors } from '../constants/colors';

interface ErrorCardProps {
    error: { message: string };
    retry: () => void;
}

export default function ErrorCard({ error, retry }: ErrorCardProps) {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    return (
        <View
            style={[
                styles.container,
                styles.centered,
                { backgroundColor: colors.background },
            ]}
        >
            <View
                style={[
                    styles.errorContainer,
                    { backgroundColor: colors.card },
                ]}
            >
                <MaterialIcons name="error" size={24} color={colors.error} />
                <Text style={{ color: colors.text }}>{error.message}</Text>
            </View>
            <TouchableOpacity onPress={retry} style={styles.retryBtn}>
                <MaterialIcons name="autorenew" size={24} color={colors.text} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        padding: 12,
        borderRadius: 8,
        margin: 12,
        width: '80%',
        alignItems: 'center',
    },
    retryBtn: {
        marginTop: 8,
    },
});
