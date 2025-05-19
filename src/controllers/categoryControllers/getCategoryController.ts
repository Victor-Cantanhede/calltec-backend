import { Request, Response } from 'express';
import Category from '../../models/Category';

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find();
        res.status(200).json({ message: 'Consulta realizada com sucesso!', data: categories });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar categorias!', error: (error as Error).message });
    }
};