import { Request, Response } from 'express';
import Department from '../../models/Department';

export const getAllDepartments = async (req: Request, res: Response): Promise<void> => {
    try {
        const departments = await Department.find();
        res.status(200).json({ message: 'Consulta realizada com sucesso!', data: departments });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar departamentos!', error: (error as Error).message });
    }
};