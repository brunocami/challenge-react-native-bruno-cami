import React, { useState, useCallback } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { getColors } from '../constants/colors';
import { RootStackParamList } from '../types/Tab';
import { Comment } from '../types/Feed';
import { useFeed } from '../hooks/Feed';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import FeedCard from '../components/FeedCard';

const PAGE_SIZE = 10;

export default function FeedScreen() {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    const { signOut } = useAuth();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
                <View style={styles.logoutContainerLoading}>
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
                <View style={styles.logoutContainerLoading}>
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
                <View
                    style={[
                        styles.errorContainer,
                        { backgroundColor: colors.card },
                    ]}
                >
                    <MaterialIcons
                        name="error"
                        size={24}
                        color={colors.error}
                    />
                    <Text style={{ color: colors.text }}>{error.message}</Text>
                </View>
                <TouchableOpacity
                    onPress={fetchComments}
                    style={{ marginTop: 8 }}
                >
                    <MaterialIcons
                        name="autorenew"
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    const renderFeedCard = ({ item }: { item: Comment }) => (
        <FeedCard item={item} />
    );

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <View style={styles.logoutContainer}>
                <View style={styles.commentsCountContainer}>
                    <Text style={[{ color: colors.text }]}>Comentarios</Text>
                    <Text style={[styles.commentsCount]}>
                        {comments.length}
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
    errorContainer: {
        padding: 12,
        borderRadius: 8,
        margin: 12,
        width: '80%',
        alignItems: 'center',
    },
    logoutContainer: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commentsCountContainer: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
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
