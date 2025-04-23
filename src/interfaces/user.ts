import { Document } from 'mongoose';

export interface IUser extends Document {
    registration: string;
    name: string;
    department: string;
    tel: string;
    email: string;
    username: string;
    password: string;
    accesslevel: number;
};