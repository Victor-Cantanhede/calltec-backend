import { Request, Response } from 'express';

import Category from '../../models/Category';
import { limitCharacters } from '../../utils/limitCharacters';
import { removeExcessiveWhitespace } from '../../utils/removeWhiteSpace';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
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
            const existingSameCategory = await Category.findOne({ formatedTitleString });

            if (existingSameCategory) {
                res.status(400).json({ message: 'Erro: Esta categoria já existe no banco de dados!' });
                return;
            }

        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////

        if (!validTitle) {
            res.status(400).json({ message: 'O título da categoria deve conter 2 à 20 caracteres!' });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////

        // Criando a categoria
        const newCategory = new Category({ title: formatedTitleString });
        await newCategory.save();
        res.status(201).json({ message: 'Categoria cadastrada com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar a categoria!', error: (error as Error).message });
    }
};