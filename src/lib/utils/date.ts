export const millisToLocalString = (millis: number): string => {
    const date = new Date(millis);
    return date.toLocaleString();
};

export const millisToTimeString = (millis: number): string => {
    const minutes = Math.floor(millis / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const seconds = Math.floor(millis / 1000) % 60;
    return `${hours}h:${minutes}m:${seconds}s`;
};
