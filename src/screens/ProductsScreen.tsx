import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import useProducts from '../hooks/Products';
import { getColors } from '../constants/colors';
import { StyleSheet } from 'react-native';
import { Product } from '../types/Products';
import ProductCard from '../components/ProductCard';

const PAGE_SIZE = 10;

export default function ProductsScreen() {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
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

    // Resetear paginado al refrescar los productos
    React.useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [products]);

    const renderProductCard = ({ item }: { item: Product }) => (
        <ProductCard item={item} />
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
});
