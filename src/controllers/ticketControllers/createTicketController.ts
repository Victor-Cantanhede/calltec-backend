import { Request, Response } from 'express';

export const createTicket = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params;
        const { category, subcategory, description } = req.body;

        if (!userId) {
            res.status(400).json({ message: 'UserID não localizado!' });
            return;
        }

        if (!category || !subcategory || !description) {
            res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
            return;
        }

        // Iserir o resto do código após criar banco de dados para categoria e subcategoria.

    } catch (error) {
        
    }
};