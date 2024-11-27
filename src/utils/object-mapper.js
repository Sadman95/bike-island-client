export const objectMapper = (obj, keys) => {
    const newObj = {};

    for (const k in obj) {
        if (keys.some((key) => key.toLowerCase() == k.toLowerCase())) {
            newObj[k] = obj[k];
        }
    }

    return newObj;
};
