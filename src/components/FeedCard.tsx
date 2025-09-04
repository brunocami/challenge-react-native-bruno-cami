import React from 'react';
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Comment } from '../types/Feed';
import { getColors } from '../constants/colors';

export default function FeedCard({ item }: { item: Comment }) {
    const scheme = useColorScheme();
    const colors = getColors(scheme);
    return (
        <View
            style={[styles.commentContainer, { backgroundColor: colors.card }]}
        >
            <View style={styles.commentAvatarContainer}>
                {item.avatar ? (
                    <Image
                        source={{ uri: item.avatar }}
                        style={styles.commentAvatar}
                    />
                ) : (
                    <View style={[styles.commentAvatar, styles.avatarCircle]}>
                        <Text style={[{ color: colors.text }]}>
                            {item.email?.[0]?.toUpperCase() || '?'}
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.commentInfoContainer}>
                <View style={styles.commentHeaderContainer}>
                    <Text
                        style={[styles.commentAuthor, { color: colors.text }]}
                    >
                        {item.email}
                    </Text>
                    <Text
                        style={[
                            styles.commentBody,
                            { color: colors.textSecondary },
                        ]}
                    >
                        {new Date(item.timestamp * 1000).toLocaleDateString()}
                    </Text>
                </View>
                <Text style={[styles.commentBody, { color: colors.text }]}>
                    {item.body}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    commentContainer: {
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
    },
    commentAvatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        overflow: 'hidden',
    },
    commentInfoContainer: {
        width: '85%',
        flex: 1,
    },
    commentHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
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
