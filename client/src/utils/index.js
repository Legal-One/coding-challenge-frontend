export const hourAndMinute = originalDate => {
    const date = new Date(originalDate);

    return `${date.getHours()}:${date.getMinutes()}`;
};
