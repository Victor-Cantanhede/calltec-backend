export const removeWhiteSpace = (string: string): string => {
    const formatedString: string = string.trim().replace(/\s/g, '');
    return formatedString;
};