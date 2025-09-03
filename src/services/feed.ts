
export const getComments = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};
