import { Request, Response } from 'express';
import Department from '../../models/Department';

export const deleteDepartment = async (req: Request, res: Response): Promise<void> => {
    try {
        const departmentId = req.params.id;
        
        if (!departmentId) {
            res.status(400).json({ message: 'ID do departamento não localizado!' });
            return;
        }

        const deletedDepartment = await Department.findByIdAndDelete(departmentId);

        if (!deletedDepartment) {
            res.status(404).json({ message: 'Departamento não localizado!' });
            return;
        }

        res.status(200).json({ message: 'Departamento deletado com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar departamento!', error: (error as Error).message });
    }
};