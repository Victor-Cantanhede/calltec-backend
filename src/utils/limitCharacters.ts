export const limitCharacters = (string: string, min: number, max: number): boolean => {
    const validString: boolean = string.length > min && string.length <= max;

    if (!validString) {
        return false;
    }
    return true;
};