import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { Product } from '../types/Products';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Tab';
import { getColors } from '../constants/colors';

export default function ProductCard({ item }: { item: Product }) {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('Checkout', { item: item });
            }}
            style={[
                styles.itemContainer,
                {
                    borderColor: colors.border,
                },
            ]}
        >
            {item.image && (
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={[styles.itemImage]}
                    />
                </View>
            )}
            <View style={styles.infoContainer}>
                <Text style={[styles.infoTitle, { color: colors.text }]}>
                    {item.title}
                </Text>
                <View style={styles.infoRating}>
                    <MaterialIcons
                        name="star"
                        size={14}
                        color={colors.primary}
                    />
                    <Text style={[styles.infoRate, { color: colors.text }]}>
                        {item.rating.rate}
                    </Text>
                </View>
                <Text style={[styles.infoPrice, { color: colors.text }]}>
                    $ {item.price}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '50%',
        minHeight: 250,
        borderWidth: 1,
        padding: 4,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        maxWidth: 180,
        aspectRatio: 1, // Mantiene la proporción cuadrada, ajusta según necesites
        resizeMode: 'contain',
    },
    infoContainer: {
        flex: 1,
        padding: 8,
    },
    infoTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    infoPrice: {
        fontSize: 14,
        color: 'gray',
    },
    infoRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoRate: {
        marginLeft: 4,
        fontSize: 14,
    },
});
