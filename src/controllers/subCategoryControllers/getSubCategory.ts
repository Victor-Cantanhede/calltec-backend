import { Request, Response } from 'express';
import SubCategory from '../../models/SubCategory';

export const getAllSubCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json({ message: 'Consulta realizada com sucesso!', data: subCategories });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar subcategorias!', error: (error as Error).message });
    }
};