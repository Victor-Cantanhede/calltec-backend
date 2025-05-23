import { Request, Response } from 'express';

import Ticket from '../../models/Ticket';
import { existingUser } from '../../services/ticketService/createTicketRules';

export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json({ message: 'Consulta realizada com sucesso!', data: tickets });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar chamados!', error: (error as Error).message });
    }
};

export const getAllOwnTickets = async (req: Request, res: Response): Promise<void> => {
    try {
        const ownerId = req.params.id;

        // Validação
        const validOwnerId: boolean = await existingUser(ownerId);
        
        if (!validOwnerId) {
            res.status(400).json({ message: 'Erro: Usuário inexistente no banco de dados!' });
            return;
        }

        const tickets = await Ticket.find({ applicant: ownerId });
        res.status(200).json({ message: 'Consulta realizada com sucesso!', data: tickets });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar chamados!', error: (error as Error).message });
    }
};