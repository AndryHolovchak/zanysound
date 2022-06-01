export const generateId = () => "_" + Math.random().toString(36).substring(2, 9);

export const copyObject = (obj: any) => JSON.parse(JSON.stringify(obj));
