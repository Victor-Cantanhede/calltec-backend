export const formatTelString = (tel: string): string => {
    const formatedTelString: string = tel.trim().replace(/\D/g, '');
    return formatedTelString;
};