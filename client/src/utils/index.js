export const getUniqueValues = (array, key) => [...new Set(array.map(item => item[key]))];

export const sort = (array, key) => array.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
