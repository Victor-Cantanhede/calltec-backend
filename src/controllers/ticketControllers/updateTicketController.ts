import { Request, Response } from 'express';

import Ticket from '../../models/Ticket';
import {
    existingTechnical,
    existingTicket,
    validStatus
} from '../../services/ticketService/updateTicketRules';

export const updateTicketByTechnical = async (req: Request, res: Response): Promise<void> => {
    const ticketId = req.params.id;
    const { responsibleId, status } = req.body;

    if (!ticketId || !responsibleId || !status) {
        res.status(400).json({ message: 'Todos os campos devem ser preenchidos para atualização!' });
        return;
    }

    try {
        // Regras de validação
        const isTicketValid = await existingTicket(ticketId);
        const isResponsibleValid = await existingTechnical(responsibleId);
        const isStatusValid = validStatus(status);

        if (!isTicketValid) {
            res.status(400).json({ message: 'Erro: Chamado inexistente no banco de dados!' });
            return;
        }

        if (!isResponsibleValid) {
            res.status(400).json({ message: 'Erro: Responsável técnico inexistente no banco de dados!' });
            return;
        }

        if (!isStatusValid) {
            res.status(400).json({ message: 'Erro: Status do chamado inválido!' });
            return;
        }

        // Atualizando o chamado
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { responsible: responsibleId, status },
            { new: true, runValidators: true }
        );

        if (!updatedTicket) {
            res.status(404).json({ message: 'Chamado não localizado!' });
            return;
        }

        res.status(200).json({ message: 'Chamado atualizado com sucesso!' });

    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar chamado!',
            error: (error as Error).message
        });
    }
};