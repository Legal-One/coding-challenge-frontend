export const getFormattedDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

export const getFormattedTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
};