import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { getColors } from '../constants/colors';

export default function NotFoundCard({ title }: { title: string }) {
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
            <Text style={{ color: colors.text }}>{title}</Text>
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
