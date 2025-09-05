import React, { useState, useCallback } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native';
import { getColors } from '../constants/colors';
import { Comment } from '../types/Feed';
import { useFeed } from '../hooks/Feed';
import FeedCard from '../components/FeedCard';
import ErrorCard from '../components/ErrorCard';
import NotFoundCard from '../components/NotFoundCard';

const PAGE_SIZE = 10;

export default function FeedScreen() {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    const { comments, loading, error, fetchComments } = useFeed();

    const handleEndReached = useCallback(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (visibleCount < comments.length) {
            setVisibleCount(prev =>
                Math.min(prev + PAGE_SIZE, comments.length),
            );
        }
    }, [visibleCount, comments.length]);

    // Resetear paginado al refrescar los comentarios
    React.useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [comments]);

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
        return <ErrorCard error={error} retry={fetchComments} />;
    }

    if (comments.length === 0) {
        return <NotFoundCard title="No hay comentarios" />;
    }

    const renderFeedCard = ({ item }: { item: Comment }) => (
        <FeedCard item={item} />
    );

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <FlatList
                data={[...comments]
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, visibleCount)}
                keyExtractor={item => item.id.toString()}
                renderItem={renderFeedCard}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={fetchComments}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.2}
                ListFooterComponent={
                    visibleCount < comments.length && !loading ? (
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
    logoutContainerLoading: {
        padding: 12,
        position: 'absolute',
        top: 12,
        right: 0,
    },

    commentsCount: {
        fontWeight: 'bold',
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 50,
        marginLeft: 12,
        color: '#fff',
    },
});
