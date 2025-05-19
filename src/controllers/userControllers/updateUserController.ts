import { Request, Response } from 'express';

import User from '../../models/User';
import { departmentRule, emailRule, nameRule, registrationRule, telRule, userNameRule } from '../../services/userService/createUserRules';


// Atualização exclusiva para admins
export const updateUserByAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const { registration, name, department, tel, email, username, accesslevel, status } = req.body;

        if (!registration || !name || !department || !tel || !email || !username || !accesslevel || !status) {
            res.status(400).json({ message: 'Todos os campos deve ser preenchidos para atualização!' });
            return;
        }

        // Validando as regras de formatação
        const validName: boolean = nameRule(name);
        const validDepartment: boolean = departmentRule(department);
        const validRegistration: boolean = registrationRule(registration);
        const validTel: boolean = telRule(tel);
        const validEmail: boolean = emailRule(email);
        const validUserName: boolean = userNameRule(username);

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
        ///////////////////////////////////////////////////////////////////////////

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { registration, name, department, tel, email, username, accesslevel, status },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'Usuário não localizado!' });
            return;
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário!', error: (error as Error).message });
    }
};