import { Router } from 'express';

import { verifyToken } from '../middlewares/verifyToken';
import { onlyTechnical } from '../middlewares/onlyTechnical';
import { createTicket } from '../controllers/ticketControllers/createTicketController';
import { getAllOwnTickets, getAllTickets } from '../controllers/ticketControllers/getTicketController';
import { updateTicketByTechnical } from '../controllers/ticketControllers/updateTicketController';

const router = Router();

// CRUD
router.post('/:id', verifyToken, createTicket);
router.get('/:id', verifyToken, getAllOwnTickets);
router.get('/', verifyToken, onlyTechnical, getAllTickets);
router.put('/:id', verifyToken, onlyTechnical, updateTicketByTechnical);

export default router;