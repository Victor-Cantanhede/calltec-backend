import { Request, Response } from 'express';

import SubCategory from '../../models/SubCategory';
import { limitCharacters } from '../../utils/limitCharacters';
import { removeExcessiveWhitespace } from '../../utils/removeWhiteSpace';

export const createSubCategory = async (req: Request, res: Response): Promise<void> => {
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
            const existingSameSubCategory = await SubCategory.findOne({ formatedTitleString });
            if (existingSameSubCategory) {
                res.status(400).json({ message: 'Erro: Esta subcategoria já existe no banco de dados!' });
                return;
            }

        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }

        ///////////////////////////////////////////////////////////////////////////

        if (!validTitle) {
            res.status(400).json({ message: 'O título da subcategoria deve conter 2 à 20 caracteres!' });
            return;
        }
        ///////////////////////////////////////////////////////////////////////////

        // Criando a subcategoria
        const newCategory = new SubCategory({ title: formatedTitleString });
        await newCategory.save();
        res.status(201).json({ message: 'Subcategoria cadastrada com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar a subcategoria!', error: (error as Error).message });
    }
};