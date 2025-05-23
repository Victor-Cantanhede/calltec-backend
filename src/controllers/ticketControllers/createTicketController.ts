import { Request, Response } from 'express';

import Ticket from '../../models/Ticket';
import { categoryRule, existingUser, subCategoryRule } from '../../services/ticketService/createTicketRules';
import { removeExcessiveWhitespace } from '../../utils/removeWhiteSpace';
import { limitCharacters } from '../../utils/limitCharacters';

export const createTicket = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const { category, subcategory, description } = req.body;

        if (!userId) {
            res.status(400).json({ message: 'UserID não localizado!' });
            return;
        }
        if (!category || !subcategory || !description) {
            res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
            return;
        }

        // Validando as regras
        try {
            const validCategory: boolean = await categoryRule(category);
            const validSubCategory: boolean = await subCategoryRule(subcategory);
            const validUserId: boolean = await existingUser(userId);

            if (!validCategory) {
                res.status(400).json({ message: 'Erro: Categoria inexistente no banco de dados!' });
                return;
            }
            if (!validSubCategory) {
                res.status(400).json({ message: 'Erro: Subcategoria inexistente no banco de dados!' });
                return;
            }
            if (!validUserId) {
                res.status(400).json({ message: 'Erro: Usuário inexistente no banco de dados!' });
                return;
            }
            
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }

        const formatedDescription: string = removeExcessiveWhitespace(description);
        const validDescription: boolean = limitCharacters(formatedDescription, 3, 200);

        if (!validDescription) {
            res.status(400).json({ message: 'Erro: A descrição deve conter de 3 à 200 caracteres!' });
            return;
        }

        // Criando o ticket
        const newTicket = new Ticket({
            applicant: userId,
            codeId: Date.now().toString(),
            category,
            subcategory,
            description
        });

        await newTicket.save();
        res.status(201).json({ message: 'Chamado criado com sucesso!' });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar chamado!', error: (error as Error).message });
    }
};