import { useState, useEffect, useCallback } from 'react';
import { getComments } from '../services/feed';
import { Comment } from '../types/Feed';

type UseFeedReturn = {
    comments: Comment[];
    loading: boolean;
    error: { title: string; message: string } | null;
    fetchComments: () => Promise<void>;
};

export function useFeed(): UseFeedReturn {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{
        title: string;
        message: string;
    } | null>(null);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await getComments();
            setComments(response);
        } catch (err: any) {
            setError({
                title: 'Error',
                message: err.message || 'Unknown error',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return { comments, loading, error, fetchComments };
}
