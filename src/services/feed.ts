import { COMMENTS } from "../constants/comments";

export const getComments = async () => {
    try {
        const response = COMMENTS;
        return response;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};
