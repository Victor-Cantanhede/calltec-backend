import Ticket from '../../models/Ticket';
import User from '../../models/User';

export const validStatus = (status: string): boolean => {
    const statuses: string[] = ['CONCLUÍDO', 'EM ANDAMENTO','PENDENTE', 'CANCELADO'];
    return statuses.includes(status);
};

export const existingTicket = async (ticketId: string): Promise<boolean> => {
    try {
        const ticket = await Ticket.findOne({ _id: ticketId });
        return !!ticket;

    } catch (error) {
        throw new Error(`Erro ao conectar ao banco de dados: ${(error as Error).message}`);
    }
};

export const existingTechnical = async (responsibleId: string): Promise<boolean> => {
    try {
        const technical = await User.findById(responsibleId);

        if (technical && technical.accesslevel >= 2) {
            return true;
        }
        return false;

    } catch (error) {
        throw new Error(`Erro ao conectar ao banco de dados: ${(error as Error).message}`);
    }
};