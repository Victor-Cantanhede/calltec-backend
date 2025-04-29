import { Request, Response } from 'express';

import User from '../../models/User';
import { nameRule, registrationRule, departmentRule, telRule, emailRule, userNameRule, passwordRule, existingUserData } from '../../services/userService/createUserRules';
import { removeWhiteSpace } from '../../utils/removeWhiteSpace';
import { formatTelString } from '../../utils/formatTelString';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { registration, name, department, tel, email, username, password } = req.body;
        
        if (!registration || !name || !department || !tel || !email || !username || !password) {
            res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            return;
        }
        
        // Validando as regras
        const validName: boolean = nameRule(name);
        const validDepartment: boolean = departmentRule(department);
        const validRegistration: boolean = registrationRule(registration);
        const validTel: boolean = telRule(tel);
        const validEmail: boolean = emailRule(email);
        const validUserName: boolean = userNameRule(username);
        const validPassword: boolean = passwordRule(password);
        
        ///////////////////////////////////////////////////////////////////////////
        
        try {
            const existingSameRegistration: boolean = await existingUserData('registration', removeWhiteSpace(registration));
            
            if (existingSameRegistration) {
                res.status(400).json({ message: 'Erro: Já existe um usuário com a mesma matrícula!' });
                return;
            }
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////

        try {
            const existingSameTel: boolean = await existingUserData('tel', formatTelString(tel));

            if (existingSameTel) {
                res.status(400).json({ message: 'Erro: Já existe um usuário com o mesmo telefone!' });
                return;
            }            
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////
        
        try {
            const existingSameEmail: boolean = await existingUserData('email', email);

            if (existingSameEmail) {
                res.status(400).json({ message: 'Erro: Já existe um usuário com o mesmo email!' });
                return;
            }
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////

        try {
            const existingSameUserName: boolean = await existingUserData('username', username);

            if (existingSameUserName) {
                res.status(400).json({ message: 'Erro: Este nome de usuário já está sendo utilizado' });
                return;
            }
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////

        if (!validRegistration) {
            res.status(400).json({ message: 'Matrícula inválida!' });
            return;
        }
        
        if (!validName) {
            res.status(400).json({ message: 'Nome inválido!' });
            return;
        }

        if (!validDepartment) {
            res.status(400).json({ message: 'Departamento inválido!' });
            return;
        }

        if (!validTel) {
            res.status(400).json({ message: 'Telefone inválido!' });
            return;
        }

        if (!validEmail) {
            res.status(400).json({ message: 'Email inválido!' });
            return;
        }

        if (!validUserName) {
            res.status(400).json({ message: 'Nome de usuário inválido!' });
            return;
        }

        if (!validPassword) {
            res.status(400).json({ message: 'Senha inválida!' });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////

        // Criando o usuário
        const newUser = new User({
            registration,
            name,
            department,
            tel,
            email,
            username,
            password
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: (error as Error).message });
    }
};