import { Request, Response } from 'express';
import Category from '../../models/Category';

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = req.params.id;
        
        if (!categoryId) {
            res.status(400).json({ message: 'ID da categoria não localizado!' });
            return;
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            res.status(404).json({ message: 'Categoria não localizada!' });
            return;
        }

        res.status(200).json({ message: 'Categoria deletada com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar categoria!', error: (error as Error).message });
    }
};