export const getUniqueValues = (array, key) => [...new Set(array.map(item => item[key]))];

export const sort = (array, key) => array.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));

export const lookupAgent = (data, key) => data.find(agent => agent.identifier === key);

export const addCommonProperties = (array, i, data) => {
    const dateTime = new Date(array[i].dateTime);
    const obj = {};

    obj.id = i;
    obj.callDateTime = dateTime;
    obj.callDate = dateTime.toLocaleDateString();
    obj.callTime = formatTime(dateTime);
    obj.resolution = data.find(item => item.identifier === array[i].identifier).resolution;

    return obj;
};

export const formatTime = (obj) => obj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
