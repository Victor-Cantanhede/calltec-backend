export const removeAllWhiteSpaces = (string: string): string => {
    const formatedString: string = string.trim().replace(/\s/g, '');
    return formatedString;
};

export const removeExcessiveWhitespace = (string: string): string => {
    const formatedString: string = string.trim().replace(/\s{2,}/g, ' ');
    return formatedString;
};