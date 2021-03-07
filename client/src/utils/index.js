export const hourAndMinute = originalDate => {
    const date = new Date(originalDate);

    return `${date.getHours()}:${date.getMinutes()}`;
};

export const dateAndTime = originalDate => {
    const date = new Date(originalDate);

    const dateOnly = date.toLocaleDateString();
    const timeOnly = date.toTimeString().split(' ')[0];

    return `${dateOnly} ${timeOnly}`;
};

export const firstAndLastName = ({ firstName, lastName }) => {
    if (!firstName) return '';

    if (!lastName) return firstName;

    return `${firstName} ${lastName}`;
};
