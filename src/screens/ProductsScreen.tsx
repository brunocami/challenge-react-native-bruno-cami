import React from 'react';
import { FlatList, Image, Text, useColorScheme, View } from 'react-native';
import useProducts from '../hooks/Products';
import { getColors } from '../constants/colors';
import { StyleSheet } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

export default function ProductsScreen() {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    const { products } = useProducts();
    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <FlatList
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View
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
                            <Text
                                style={[
                                    styles.infoTitle,
                                    { color: colors.text },
                                ]}
                            >
                                {item.title}
                            </Text>
                            <View style={styles.infoRating}>
                                <MaterialIcons
                                    name="star"
                                    size={14}
                                    color={colors.primary}
                                />
                                <Text
                                    style={[
                                        styles.infoRate,
                                        { color: colors.text },
                                    ]}
                                >
                                    {item.rating.rate}
                                </Text>
                            </View>
                            <Text
                                style={[
                                    styles.infoPrice,
                                    { color: colors.text },
                                ]}
                            >
                                $ {item.price}
                            </Text>
                        </View>
                    </View>
                )}
                numColumns={2}
                columnWrapperStyle={styles.flatListContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListContainer: {
        paddingHorizontal: 8,
        justifyContent: 'space-between',
    },
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
