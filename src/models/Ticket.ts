import mongoose, { Schema } from 'mongoose';

import { ITicket } from '../interfaces/ITicket';

const TicketSchema: Schema = new Schema({
    applicant: {
        type: String,
        required: true
    },
    codeId: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    responsible: {
        type: String,
        required: true,
        default: 'NÃO ATRIBUÍDO'
    },
    status: {
        type: String,
        required: true,
        default: 'PENDENTE'
    }
}, { timestamps: true });

const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);
export default Ticket;