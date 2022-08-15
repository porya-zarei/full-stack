export const enumToArray = <T extends Record<any, any>>(enumType: T) => {
    return Object.keys(enumType)
        .filter((key) => !isNaN(Number(key)))
        .map((k) => ({
            key: `${enumType[k]}`,
            value: k,
        }));
};
