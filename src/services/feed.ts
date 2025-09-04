import feedData from '../assets/feed.json'

export const getComments = async () => {
    try {
        const response = feedData;
        return response;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};
