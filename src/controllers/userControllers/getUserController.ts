import { Request, Response } from 'express';
import User from '../../models/User';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Consulta realizada com sucesso!', data: users });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários!', error: (error as Error).message });
    }
};