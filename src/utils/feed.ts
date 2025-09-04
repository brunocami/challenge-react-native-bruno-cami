export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dd = pad(date.getDate());
    const mm = pad(date.getMonth() + 1);
    const aa = pad(date.getFullYear() % 100);
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    const formattedDate = `${dd}/${mm}/${aa} ${hh}:${min}`;
    return formattedDate;
}