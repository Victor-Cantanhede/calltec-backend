import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './config/database';

dotenv.config();
connectDatabase();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONT_URI as string,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});