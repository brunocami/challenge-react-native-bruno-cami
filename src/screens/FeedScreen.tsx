import React from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    Image,
    StyleSheet,
    Text,
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

export default function FeedScreen() {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    const { signOut } = useAuth();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { comments, loading, error } = useFeed();

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
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <Text>Error: {error}</Text>
        </View>;
    }

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <Button
                title="Cerrar sesión"
                onPress={async () => {
                    await signOut();
                    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                }}
            />

            <FlatList
                data={comments}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }: { item: Comment }) => (
                    <View
                        style={[
                            styles.commentContainer,
                            { backgroundColor: colors.card },
                        ]}
                    >
                        {item.avatar ? (
                            <Image
                                source={{ uri: item.avatar }}
                                style={styles.commentAvatar}
                            />
                        ) : (
                            <View
                                style={[
                                    styles.commentAvatar,
                                    styles.avatarCircle,
                                ]}
                            >
                                <Text style={[{ color: colors.text }]}>
                                    {item.email?.[0]?.toUpperCase() || '?'}
                                </Text>
                            </View>
                        )}
                        <Text
                            style={[
                                styles.commentAuthor,
                                { color: colors.text },
                            ]}
                        >
                            {item.email}
                        </Text>
                        <Text
                            style={[styles.commentBody, { color: colors.text }]}
                        >
                            {item.body}
                        </Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentContainer: {
        marginBottom: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    commentAuthor: {
        fontWeight: 'bold',
    },
    commentBody: {
        marginTop: 4,
    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        overflow: 'hidden',
    },
    avatarCircle: {
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
