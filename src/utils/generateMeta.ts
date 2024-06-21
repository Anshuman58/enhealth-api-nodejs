export const generateMeta = (name: string): string => {
    const lowerCase = name.toLowerCase();
    const metaName = lowerCase.replace(/\s+/g, '_');
    return metaName;
};
