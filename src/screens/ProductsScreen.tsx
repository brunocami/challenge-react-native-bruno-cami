import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import useProducts from '../hooks/Products';
import { getColors } from '../constants/colors';
import { StyleSheet } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Product } from '../types/Products';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Tab';

const PAGE_SIZE = 12;

export default function ProductsScreen() {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    const { products, loading, error, fetchProducts } = useProducts();

    const handleEndReached = useCallback(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (visibleCount < products.length) {
            setVisibleCount(prev =>
                Math.min(prev + PAGE_SIZE, products.length),
            );
        }
    }, [visibleCount, products.length]);

    // Reset visibleCount when products are refreshed
    React.useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [products]);

    const renderProductCard = ({ item }: { item: Product }) => (
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

    if (loading) {
        return (
            <View
                style={[
                    styles.container,
                    styles.centered,
                    { backgroundColor: colors.background },
                ]}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={[
                    styles.container,
                    styles.centered,
                    { backgroundColor: colors.background },
                ]}
            >
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <FlatList
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={renderProductCard}
                numColumns={2}
                columnWrapperStyle={styles.flatListContainer}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={fetchProducts}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.2}
                ListFooterComponent={
                    visibleCount < products.length && !loading ? (
                        <ActivityIndicator style={{ margin: 16 }} />
                    ) : null
                }
            />
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
