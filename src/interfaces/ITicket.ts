import { Document } from 'mongoose';

export interface ITicket extends Document {
    applicant: string;
    codeId: string;
    category: string;
    subcategory: string;
    description: string;
    responsible: string;
    status: string;
};