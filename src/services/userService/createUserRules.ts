import User from '../../models/User';
import { limitCharacters } from '../../utils/limitCharacters';
///////////////////////////////////////////////////////////////////////////

// Registration (Matrícula)
export const registrationRule = (registration: string): boolean => {
    const formatedRegistrationString: string = registration.trim().replace(/\s/g, '');
    const numberOfCharacters: boolean = limitCharacters(formatedRegistrationString, 0, 15);

    if (!numberOfCharacters) {
        return false;
    }
    return true;
};
///////////////////////////////////////////////////////////////////////////

// Nome
export const nameRule = (name: string): boolean => {
    const formatedNameString: string = name
        .trim()
        .replace(/\s{2,}/g, ' ')
        .split(' ')
        .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');

    const validCharacters: boolean = /^[\p{L} ]+$/u.test(formatedNameString);
    const numberOfCharacters: boolean = limitCharacters(formatedNameString, 0, 80);
    
    if (!validCharacters || !numberOfCharacters) {
        return false;
    }
    return true;
};
///////////////////////////////////////////////////////////////////////////

// Departamento
export const departmentRule = (department: string): boolean => {
    const formatedDepartmentString: string = department
        .trim()
        .replace(/\s{2,}/g, ' ')
        .split(' ')
        .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');

    const validCharacters: boolean = /^[\p{L} ]+$/u.test(formatedDepartmentString);
    const numberOfCharacters: boolean = limitCharacters(formatedDepartmentString, 0, 50);

    if (!validCharacters || !numberOfCharacters) {
        return false;
    }
    return true;
};
///////////////////////////////////////////////////////////////////////////

// Telefone
export const telRule = (tel: string): boolean => {
    const formatedTelString: string = tel.trim().replace(/\s/g, '');
    const validCharacters: boolean = /^\d+$/.test(formatedTelString);
    const numberOfCharacters: boolean = limitCharacters(formatedTelString, 0, 12);

    if (!validCharacters || numberOfCharacters) {
        return false;
    }
    return true;
};
///////////////////////////////////////////////////////////////////////////

// Email
export const emailRule = (email: string): boolean => {
    const isValidEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const numberOfCharacters: boolean = limitCharacters(email, 0, 40);

    if (!isValidEmail || !numberOfCharacters) {
        return false;
    }
    return true;
};
///////////////////////////////////////////////////////////////////////////

// UserName
export const userNameRule = (username: string): boolean => {
    const numberOfCharacters: boolean = limitCharacters(username, 8, 20);
    const hasUpperAndLowerCase: boolean = /[A-Z]/.test(username) && /[a-z]/.test(username);
    const noSpecialCharacters: boolean = /^[\p{L}\d.\-]+$/u.test(username); // Permite . e -

    if (!numberOfCharacters || !hasUpperAndLowerCase || !noSpecialCharacters) {
        return false;
    }
    return true;
};
///////////////////////////////////////////////////////////////////////////

// Password
export const passwordRule = (password: string): boolean => {
    const numberOfCharacters: boolean = limitCharacters(password, 10, 20);
    const hasUpperAndLowerCase: boolean = /[A-Z]/.test(password) && /[a-z]/.test(password);
    const hasNumber: boolean = /[0-9]/.test(password);
    const hasSpecialCharacters: boolean = /[^a-zA-Z0-9]/.test(password);
    const hasWhiteSpaces: boolean = /\s/.test(password);

    if (!numberOfCharacters || !hasUpperAndLowerCase || !hasNumber || !hasSpecialCharacters || hasWhiteSpaces) {
        return false;
    }
    return true;
};
///////////////////////////////////////////////////////////////////////////

// Verifica se já existe o mesmos dado no banco de usuários
export const existingUserData = async (field: string, value: string): Promise<boolean> => {
    try {
        const data = await User.findOne({ [field]: value });
        return !!data;

    } catch (error) {
        throw new Error(`Erro ao conectar ao banco de dados: ${(error as Error).message}`);
    }
};