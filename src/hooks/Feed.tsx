import { useState, useEffect, useCallback } from 'react';
import { getComments } from '../services/feed';
import { Comment } from '../types/Feed';

type UseFeedReturn = {
    comments: Comment[];
    loading: boolean;
    error: string | null;
    fetchComments: () => Promise<void>;
};

export function useFeed(): UseFeedReturn {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getComments();
            setComments(response);
        } catch (err: any) {
            setError(err.message || 'Error fetching comments');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return { comments, loading, error, fetchComments };
}
