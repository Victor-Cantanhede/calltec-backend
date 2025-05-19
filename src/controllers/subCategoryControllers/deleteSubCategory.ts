import { Request, Response } from 'express';
import SubCategory from '../../models/SubCategory';

export const deleteSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const subCategoryId = req.params.id;

        if (!subCategoryId) {
            res.status(400).json({ message: 'ID da subcategoria não localizado!' });
            return;
        }

        const deletedSubCategory = await SubCategory.findByIdAndDelete(subCategoryId);

        if (!deletedSubCategory) {
            res.status(404).json({ message: 'Subcategoria não localizada!' });
            return;
        }

        res.status(200).json({ message: 'Subcategoria deletada com sucesso!' });
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar subcategoria!', error: (error as Error).message });
    }
};