import { Request, Response } from 'express';

import Department from '../../models/Department';
import { limitCharacters } from '../../utils/limitCharacters';
import { removeExcessiveWhitespace } from '../../utils/removeWhiteSpace';

export const createDepartment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.body;

        if (!title) {
            res.status(400).json({ message: 'Todos os campos devem ser preenchidos!' });
            return;
        }

        // Validando regras
        const formatedTitleString: string = removeExcessiveWhitespace(title).toUpperCase();
        const validTitle: boolean = limitCharacters(formatedTitleString, 2, 20);

        ///////////////////////////////////////////////////////////////////////////

        try {
            const existingSameDepartment = await Department.findOne({ formatedTitleString });

            if (existingSameDepartment) {
                res.status(400).json({ message: 'Erro: Este departamento já existe no banco de dados!' });
                return;
            }

        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////

        if (!validTitle) {
            res.status(400).json({ message: 'O título do departamento deve conter 2 à 20 caracteres!' });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////

        // Criando o departamento
        const newDepartment = new Department({ title: formatedTitleString });
        await newDepartment.save();
        res.status(201).json({ message: 'Departamento cadastrado com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar o departamento!', error: (error as Error).message });
    }
};